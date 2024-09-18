import enum
from typing import Literal

from pydantic import BaseModel


class Error(BaseModel, extra="allow"):
    msg: str
    type: str
    help: str = ""


class Response(BaseModel, extra="forbid"):
    """Message sent from compute app to validator in response to AuthenticateRequest"""

    status: Literal["error", "success"]
    errors: list[Error] = []


class ContainerRequestType(enum.Enum):
    ContainerCreateRequest = "ContainerCreateRequest"
    ContainerDeleteRequest = "ContainerDeleteRequest"


class ContainerBaseRequest(BaseModel):
    message_type: ContainerRequestType
    miner_hotkey: str
    executor_id: str


class ContainerCreateRequest(ContainerBaseRequest):
    message_type: ContainerRequestType = ContainerRequestType.ContainerCreateRequest
    docker_image: str
    user_public_key: str


class ContainerDeleteRequest(ContainerBaseRequest):
    message_type: ContainerRequestType = ContainerRequestType.ContainerDeleteRequest
    container_name: str
    volume_name: str
