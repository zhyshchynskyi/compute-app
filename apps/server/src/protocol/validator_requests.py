import enum
import json

import pydantic

from models.executor import MachineSpecs
from protocol.base import BaseRequest


class RequestType(enum.Enum):
    AuthenticateRequest = "AuthenticateRequest"
    MachineSpecRequest = "MachineSpecRequest"
    ExecutorSpecRequest = "ExecutorSpecRequest"
    ContainerCreated = "ContainerCreated"
    ContainerStarted = ("ContainerStarted",)
    ContainerStopped = "ContainerStopped"
    ContainerDeleted = "ContainerDeleted"
    FailedRequest = "FailedRequest"


class BaseValidatorRequest(BaseRequest):
    message_type: RequestType


class AuthenticationPayload(pydantic.BaseModel):
    validator_hotkey: str
    timestamp: int

    def blob_for_signing(self):
        instance_dict = self.model_dump()
        return json.dumps(instance_dict, sort_keys=True)


class AuthenticateRequest(BaseValidatorRequest):
    message_type: RequestType = RequestType.AuthenticateRequest
    payload: AuthenticationPayload
    signature: str

    def blob_for_signing(self):
        return self.payload.blob_for_signing()


class ExecutorSpecRequest(BaseValidatorRequest):
    message_type: RequestType = RequestType.ExecutorSpecRequest
    miner_hotkey: str
    validator_hotkey: str
    executor_uuid: str
    executor_ip: str
    executor_port: int
    specs: MachineSpecs


class ContainerBaseResponse(BaseValidatorRequest):
    message_type: RequestType
    miner_hotkey: str
    executor_id: str


class ContainerCreatedResult(BaseValidatorRequest):
    container_name: str
    volume_name: str
    port_maps: list[tuple[int, int]]


class ContainerCreated(ContainerBaseResponse, ContainerCreatedResult):
    message_type: RequestType = RequestType.ContainerCreated


class ContainerStarted(ContainerBaseResponse):
    message_type: RequestType = RequestType.ContainerStarted
    container_name: str


class ContainerStopped(ContainerBaseResponse):
    message_type: RequestType = RequestType.ContainerStopped
    container_name: str


class ContainerDeleted(ContainerBaseResponse):
    message_type: RequestType = RequestType.ContainerDeleted
    container_name: str
    volume_name: str


class FailedContainerRequest(ContainerBaseResponse):
    message_type: RequestType = RequestType.FailedRequest
    msg: str
