from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import JSON, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import Column, Field, Relationship, SQLModel

from models.base_model import BaseModel

if TYPE_CHECKING:
    from models.pod import Pod


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
    details: list[GpuDetail]


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
    rented: bool = Field(default=False, nullable=False)

    __table_args__ = (UniqueConstraint("miner_hotkey", "executor_id", name="uq_miner_executor"),)
    pod: "Pod" = Relationship(back_populates="executor")

    # @field_validator('specs')
    # def validate_specs(cls, specs: MachineSpecs):
    #     return specs.model_dump()
