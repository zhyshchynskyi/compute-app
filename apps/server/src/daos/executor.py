from pydantic import BaseModel
from sqlalchemy import func, select

from daos.base import BaseDao
from models.executor import Executor

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
            select(Executor).where(Executor.id == executor.id)
        ).scalar_one_or_none()
        
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
