from typing import Annotated, Optional, List
from uuid import UUID
from pydantic import field_validator
from fastapi import Depends

from sqlmodel import SQLModel, Field, Column, select
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import JSON

from models.base_model import BaseModel, BaseDao


class GpuDetail(SQLModel):
    name: str
    driver: str
    capacity: str
    cuda: str
    power_limit: str
    graphics_speed: str
    memory_speed: str
    pcei: str


class GpuSpec(SQLModel):
    count: int
    details: List[GpuDetail]


class CpuSpec(SQLModel):
    count: int
    model: str


class MemorySpec(SQLModel):
    total: int
    used: int
    free: int


class MachineSpecs(SQLModel):
    gpu: GpuSpec
    cpu: CpuSpec
    ram: MemorySpec


class Executor(BaseModel, table=True):
    miner_hotkey: str
    validator_hotkey: str
    executor_id: UUID
    executor_ip_address: str
    executor_ip_port: str
    specs: MachineSpecs = Field(sa_column=Column(type_=JSONB(astext_type=JSON()), nullable=False))
    rented: Optional[bool] = None

    # @field_validator('specs')
    # def validate_specs(cls, specs: MachineSpecs):
    #     return specs.model_dump()


class ExecutorDao(BaseDao):
    def upsert(self, executor: Executor) -> Executor:
        existing = self.find_by_miner_hotkey_and_executor_id(
            miner_hotkey=executor.miner_hotkey,
            executor_id=executor.executor_id,
        )
        if existing:
            for field_name, field_value in executor.dict().items():
                setattr(existing, field_name, field_value)

            self.session.commit()
            self.session.refresh(existing)

            return existing
        else:
            # Create new executor
            self.session.add(executor)
            self.session.commit()
            self.session.refresh(executor)

            return executor

    def find_by_miner_hotkey_and_executor_id(self, miner_hotkey: str, executor_id: str):
        return self.session.exec(select(Executor).where(Executor.miner_hotkey == miner_hotkey, Executor.executor_id == executor_id)).first()

    def find_all(self) -> list[Executor]:
        return self.session.exec(select(Executor)).all()

    def find_by_id(self, executor_id: UUID) -> Optional[Executor]:
        return self.session.exec(select(Executor).where(Executor.executor_id == executor_id)).first()


ExecutorDaoDep = Annotated[ExecutorDao, Depends(ExecutorDao)]
