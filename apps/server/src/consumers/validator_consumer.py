import asyncio
import logging
import time

import bittensor
from fastapi import WebSocket, WebSocketDisconnect

from protocol.base import BaseRequest
from protocol.compute_app_requests import ContainerCreateRequest, Response
from protocol.validator_requests import (
    AuthenticateRequest,
    BaseValidatorRequest,
    ContainerCreated,
    ContainerDeleted,
    ExecutorSpecRequest,
    FailedContainerRequest,
)
from worker import save_executor_into_db

AUTH_MESSAGE_MAX_AGE = 10
MAX_MESSAGE_COUNT = 10
MAX_RENT_LENGTH = 60 * 10

logger = logging.getLogger(__name__)


class RentState:
    def __init__(self):
        self.container_created_or_failed_future = asyncio.Future()
        self.container_deleted_or_failed_future = asyncio.Future()


class ValidatorConsumersManager:
    def __init__(self):
        self.consumers = {}

    def register_consumer(self, consumer: "ValidatorConsumer"):
        self.consumers[consumer.validator_key] = consumer
        logger.info(
            "Register validator consumer(%s) to manager. Total consumers: %d",
            consumer.validator_key,
            len(self.consumers),
        )

    def deregister_consumer(self, consumer: "ValidatorConsumer"):
        if self.consumers.get(consumer.validator_key) is consumer:
            self.consumers.pop(consumer.validator_key)
        logger.info(
            "Deregister validator consumer(%s) to manager. Total consumers: %d",
            consumer.validator_key,
            len(self.consumers),
        )

    def get_consumer(self, validator_key: str) -> "ValidatorConsumer":
        return self.consumers.get(validator_key)


class ValidatorConsumer:
    def __init__(self, websocket: WebSocket, validator_key: str):
        self.websocket = websocket
        self.validator_key = validator_key
        self.validator_authenticated = False
        self.msg_queue = []
        self.rent_states: dict[str, RentState] = {}

    def verify_auth_msg(self, msg: AuthenticateRequest) -> tuple[bool, str]:
        if msg.payload.timestamp < time.time() - AUTH_MESSAGE_MAX_AGE:
            return False, "msg too old"

        if msg.payload.validator_hotkey != self.validator_key:
            return (
                False,
                f"wrong validator hotkey ({self.validator_key}!={msg.payload.validator_hotkey})",
            )

        keypair = bittensor.Keypair(ss58_address=self.validator_key)
        if keypair.verify(msg.blob_for_signing(), msg.signature):
            return True, ""
        return False, ""

    def accepted_request_type(self):
        return BaseValidatorRequest

    async def connect(self):
        await self.websocket.accept()

    async def receive_message(self) -> BaseValidatorRequest:
        data = await self.websocket.receive_text()
        return self.accepted_request_type().parse(data)

    async def send_message(self, msg: BaseRequest):
        await self.websocket.send_text(msg.json())

    async def disconnect(self):
        # deregister consumer from manager
        validator_consumers_manager.deregister_consumer(self)

        try:
            await self.websocket.close()
        except Exception:
            pass

    async def handle_authentication(self, msg: AuthenticateRequest):
        # TODO: check if validator is registered
        # if not self.validator_service.is_valid_validator(self.validator_key):
        #     await self.send_message(UnAuthorizedRequest(details="Validator is not registered"))
        #     await self.disconnect()
        #     return

        authenticated, error_msg = self.verify_auth_msg(msg)
        if not authenticated:
            await self.send_message(Response(status="error"))
            await self.disconnect()
            return
        else:
            await self.send_message(Response(status="success"))

        # register consumer to manager
        validator_consumers_manager.register_consumer(self)

        self.validator_authenticated = True
        for msg in self.msg_queue:
            await self.handle_message(msg)

    async def handle_message(self, msg: BaseValidatorRequest):
        if isinstance(msg, AuthenticateRequest):
            await self.handle_authentication(msg)
            return

        if not self.validator_authenticated:
            if len(self.msg_queue) <= MAX_MESSAGE_COUNT:
                self.msg_queue.append(msg)
            return

        if isinstance(msg, ExecutorSpecRequest):
            await self.handle_executor_machine_spec(msg)
            return

        if isinstance(msg, ContainerCreated | FailedContainerRequest):
            executor_id = msg.executor_id
            rent_state: RentState = self.rent_states.get(executor_id)
            if rent_state is None:
                return
            rent_state.container_created_or_failed_future.set_result(msg)
            return

        if isinstance(msg, ContainerDeleted | FailedContainerRequest):
            executor_id = msg.executor_id
            rent_state: RentState = self.rent_states.get(executor_id)
            if rent_state is None:
                return
            rent_state.container_deleted_or_failed_future.set_result(msg)
            return

    async def handle_executor_rent(
        self, miner_hotkey: str, executor_uuid: str, docker_image: str, user_pubkey: str
    ) -> ContainerCreated:
        if self.rent_states.get(executor_uuid):
            raise Exception(f"Executor({executor_uuid}) has been already rented.")

        self.rent_states[executor_uuid] = RentState()

        # send rent request to validator
        await self.send_message(
            ContainerCreateRequest(
                docker_image=docker_image,
                user_public_key=user_pubkey,
                miner_hotkey=miner_hotkey,
                executor_id=executor_uuid,
            )
        )

        # wait until validator returns with the result
        try:
            msg: ContainerCreated | FailedContainerRequest = await asyncio.wait_for(
                self.rent_states[executor_uuid].container_created_or_failed_future, MAX_RENT_LENGTH
            )
        except TimeoutError:
            msg = None

        if isinstance(msg, ContainerCreated):
            logger.info(
                "Container created on executor(%s): container_name=%s, volume_name=%s",
                executor_uuid,
                msg.container_name,
                msg.volume_name,
            )
            return msg
        elif isinstance(msg, FailedContainerRequest):
            message = f"Container creation failed due to {msg.msg}"
            logger.warning(message)
            raise Exception(message)
        else:
            logger.warning("Unexpected error")
            raise Exception("No response from validator")

    async def handle_executor_machine_spec(self, executor_spec: ExecutorSpecRequest):
        """Store into DB"""
        logger.info("Storing executor machine spec into DB: %s", str(executor_spec))
        save_executor_into_db.delay(executor_spec.model_dump_json())

    async def handle(self):
        # await self.connect()
        try:
            while True:
                data: BaseRequest = await self.receive_message()
                await self.handle_message(data)
        except WebSocketDisconnect as ex:
            logger.info("Websocket connection closed, e: %s", str(ex))
            await self.disconnect()
        except Exception as ex:
            logger.info("Handling message error: %s", str(ex))
            await self.disconnect()


validator_consumers_manager = ValidatorConsumersManager()
