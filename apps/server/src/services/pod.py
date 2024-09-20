from typing import Annotated
from uuid import UUID

from fastapi import Depends

from daos.pod import PodDao
from dtos.pod import PodCreateRequest, PodResponse, PodUpdateRequest
from models import Pod, User


class PodService:
    def __init__(self, pod_dao: Annotated[PodDao, Depends(PodDao)]):
        self.pod_dao = pod_dao

    async def get_available_pods(self, user_id: UUID | str) -> list[PodResponse]:
        """Fetch all available pods."""
        return self.pod_dao.find_all_by_user_id(user_id)

    async def get_pod_by_id(self, user_id: UUID | str, executor_id: UUID | str) -> PodResponse:
        return self.pod_dao.find_by_executor_id(executor_id, user_id)

    async def create_pod(self, user: User, payload: PodCreateRequest) -> Pod:
        """Create a new pod."""
        pass
        # new_pod = Pod(
        #     name=payload.name,
        #     description=payload.description,
        #     owner_id=user.id
        # )
        # return await self.pod_repository.save_pod(new_pod)

    async def update_pod(self, user: User, pod_uuid: UUID, payload: PodUpdateRequest) -> Pod:
        """Update an existing pod."""
        pass
        # pod = await self.pod_repository.get_pod_by_uuid(pod_uuid)
        # if not pod:
        #     raise ValueError("Pod not found")
        # if pod.owner_id != user.id:
        #     raise PermissionError("User not authorized to update this pod")

        # if payload.name is not None:
        #     pod.name = payload.name
        # if payload.description is not None:
        #     pod.description = payload.description

        # return await self.pod_repository.save_pod(pod)

    async def delete_pod(self, user: User, pod_uuid: UUID) -> None:
        """Delete an existing pod."""
        # pod = await self.pod_repository.get_pod_by_uuid(pod_uuid)
        # if not pod:
        #     raise ValueError("Pod not found")
        # if pod.owner_id != user.id:
        #     raise PermissionError("User not authorized to delete this pod")

        # await self.pod_repository.delete_pod(pod)
        pass
