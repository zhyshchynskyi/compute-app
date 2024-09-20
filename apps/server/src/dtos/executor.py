from pydantic import BaseModel

from dtos.base import BaseResponse


class RentExecutorRequest(BaseModel):
    # TODO: this needs to be replaced w/ template
    pod_name: str
    docker_image: str
    user_public_key: str

    class Config:
        schema_extra = {
            "example": {
                "executor_id": "123e4567-e89b-12d3-a456-426614174000",
                "docker_image": "runpod/pytorch:2.1.0-py3.10-cuda11.8.0-devel-ubuntu22.04",
                "user_public_key": "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMo32AY0vFK7g5FBIBcyPdxaxSEM5rEc0kEzMVveA9b+",
            }
        }


class ExecutorRentSuccessResponse(BaseResponse):
    success: bool = True
    message: str | None = "Executor successfully rented"


class ExecutorRentFailedResponse(BaseResponse):
    success: bool = False
