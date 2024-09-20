from typing import TYPE_CHECKING, TypedDict
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


class PodInfoFromExecutorDict(TypedDict):
    ssh_connect_cmd: str
    gpu_name: str
    gpu_count: int
    cpu_name: str
    ram_total: int


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

    def get_specs_for_pod(self) -> PodInfoFromExecutorDict:
        machine_specs = MachineSpecs.model_validate(self.specs)
        return {
            "gpu_name": machine_specs.gpu.details[0].name if machine_specs.gpu.details else "",
            "gpu_count": machine_specs.gpu.count,
            "cpu_name": machine_specs.cpu.model,
            "ram_total": machine_specs.ram.total,
        }
