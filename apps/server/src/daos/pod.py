import logging
from uuid import UUID

from sqlmodel import select

from daos.base import BaseDao
from dtos.pod import PodResponse
from models.pod import Pod

logger = logging.getLogger(__name__)


class PodDao(BaseDao):
    def save(self, pod: Pod) -> Pod:
        existing_pod = self.find_by_executor_id(pod.executor_id)
        if existing_pod:
            for field_name, field_value in pod.dict().items():
                setattr(existing_pod, field_name, field_value)
            self.session.commit()
            self.session.refresh(existing_pod)
            return existing_pod
        else:
            self.session.add(pod)
            self.session.commit()
            self.session.refresh(pod)
            return pod

    def find_by_executor_id(
        self, executor_id: UUID, user_id: UUID | None = None
    ) -> Pod | PodResponse | None:
        if not user_id:
            return self.session.exec(select(Pod).where(Pod.executor_id == executor_id)).first()

        return self.session.exec(
            select(
                Pod.executor_id.label("id"),
                Pod.ports_mapping,
                Pod.ssh_connect_cmd,
                Pod.gpu_name,
                Pod.gpu_count,
                Pod.cpu_name,
                Pod.ram_total,
                Pod.pod_name,
            ).where(Pod.executor_id == executor_id, Pod.user_id == user_id)
        ).first()

    def find_all_by_user_id(self, user_id: UUID | str) -> list[PodResponse] | None:
        return self.session.exec(
            select(
                Pod.executor_id.label("id"),
                Pod.ports_mapping,
                Pod.ssh_connect_cmd,
                Pod.gpu_name,
                Pod.gpu_count,
                Pod.cpu_name,
                Pod.ram_total,
                Pod.pod_name,
            ).where(Pod.user_id == user_id)
        ).all()

    def find_all(self) -> list[Pod]:
        return self.session.exec(select(Pod)).all()

    def remove_by_executor_id(self, executor_id: UUID) -> None:
        try:
            pod = self.find_by_executor_id(executor_id)
            if pod:
                self.session.delete(pod)
                self.session.commit()
                logger.info(f"Pod with executor ID {executor_id} removed successfully.")
            else:
                logger.warning(f"No pod found with executor ID {executor_id}.")
        except Exception as e:
            self.session.rollback()
            logger.error(f"Error removing pod with executor ID {executor_id}: {e}")
            raise
