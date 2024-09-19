import logging
from typing import Annotated
from uuid import UUID

from fastapi import Depends

from consumers.validator_consumer import validator_consumers_manager
from daos.executor import ExecutorDao
from daos.pod import PodDao
from dtos.base import BaseResponse
from dtos.executor import (
    RentExecutorRequest,
)
from models.executor import Executor
from models.pod import Pod

logger = logging.getLogger(__name__)


class ExecutorService:
    def __init__(
        self,
        executor_dao: Annotated[ExecutorDao, Depends(ExecutorDao)],
        pod_dao: Annotated[PodDao, Depends(PodDao)],
    ):
        self.executor_dao = executor_dao
        self.pod_dao = pod_dao

    async def rent_executor(self, payload: RentExecutorRequest, executor_uuid: UUID):
        # Fetch the executor by UUID
        executor = self.executor_dao.get_executor_by_uuid(executor_uuid)

        if not executor:
            raise Exception(f"Executor {executor_uuid} doesn't exist.")

        # send request to validator to rent the machine.
        logger.info(
            "Request to rent executor(%s) to validator(%s)",
            str(executor_uuid),
            executor.validator_hotkey,
        )
        consumer = validator_consumers_manager.get_consumer(executor.validator_hotkey)
        if not consumer:
            logger.warning(
                "No validator consumer available for validator(%s)", executor.validator_hotkey
            )
            raise Exception(f"Can't rent this executor({executor_uuid}).")

        container_created = await consumer.handle_executor_rent(
            executor.miner_hotkey,
            str(executor.executor_id),
            payload.docker_image,
            payload.user_public_key,
        )
        ports_mapping = {internal: external for (internal, external) in container_created.port_maps}
        self.pod_dao.save(
            Pod(
                executor_id=executor.id,
                container_name=container_created.container_name,
                volume_name=container_created.volume_name,
                ports_mapping=ports_mapping,
            )
        )

        # Update the executor's rented status
        executor.rented = True
        self.executor_dao.save(executor)

    async def remove_rent(self, executor_uuid: UUID):
        # Fetch the executor by UUID
        executor = self.executor_dao.get_executor_by_uuid(executor_uuid)

        if not executor:
            raise Exception(f"Executor {executor_uuid} doesn't exist.")

        pod = self.pod_dao.find_by_executor_id(executor_uuid)
        if not pod:
            raise Exception(f"Pod for executor({executor_uuid}) doesn't exist.")

        consumer = validator_consumers_manager.get_consumer(executor.validator_hotkey)
        if not consumer:
            logger.warning(
                "No validator consumer available for validator(%s)", executor.validator_hotkey
            )
            raise Exception(f"Can't rent this executor({executor_uuid}).")

        # TODO: check if current executor is rented by correct owner

        # remote docker container.
        await consumer.handle_executor_remove_rent(
            executor.miner_hotkey, str(executor.executor_id), pod.container_name, pod.volume_name
        )

        # Update the executor's rented status
        executor.rented = False
        self.executor_dao.save(executor)

        return BaseResponse(success=True, message="Executor rent removed successfully")

    def get_available_executors(self) -> list[Executor]:
        return list(self.executor_dao.get_available_executors())
