import logging
from uuid import UUID

from pydantic import BaseModel
from sqlalchemy import select

from daos.base import BaseDao
from models.executor import Executor

logger = logging.getLogger(__name__)


class MinerScore(BaseModel):
    miner_hotkey: str
    total_score: float


class ExecutorDao(BaseDao):
    def save(self, task: Executor) -> Executor:
        self.session.add(task)
        self.session.commit()
        self.session.refresh(task)
        return task

    def upsert(self, executor: Executor) -> Executor:
        existing_executor = self.session.exec(
            select(Executor).where(Executor.executor_id == executor.executor_id)
        ).scalar_one_or_none()

        logger.info("Checked executor exists: %s", str(existing_executor))
        if existing_executor:
            for key, value in executor.model_dump().items():
                setattr(existing_executor, key, value)
            self.session.commit()
            self.session.refresh(existing_executor)
            return existing_executor
        else:
            self.session.add(executor)
            self.session.commit()
            self.session.refresh(executor)
            return executor

    def get_executor_by_uuid(self, uuid: UUID | str) -> None | Executor:
        statement = select(Executor).where(Executor.id == uuid)
        result = self.session.exec(statement=statement)
        executor = result.scalar_one_or_none()
        return executor

    def get_available_executors(self) -> list[Executor]:
        statement = select(Executor).where(Executor.rented is False)
        result = self.session.exec(statement)
        available_executors = result.all()
        return [executor[0] for executor in available_executors]
