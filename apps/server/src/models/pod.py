from typing import TYPE_CHECKING, Self
from uuid import UUID

from sqlalchemy import JSON, Column
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from models.executor import Executor
    from models.user import User


class Pod(SQLModel, table=True):
    executor_id: UUID = Field(foreign_key="executor.id", primary_key=True)
    pod_name: str = ""
    user_id: UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    container_name: str = ""
    volume_name: str = ""
    ports_mapping: str = Field(
        sa_column=Column(type_=JSONB(astext_type=JSON()), nullable=False), default="{}"
    )
    ssh_connect_cmd: str = ""
    gpu_name: str = ""
    gpu_count: str = ""
    cpu_name: str = ""
    ram_total: int = 0

    executor: "Executor" = Relationship(back_populates="pod")
    user: "User" = Relationship(back_populates="pods")

    # Needed for Column(JSON)
    class Config:
        arbitrary_types_allowed = True

    @classmethod
    def from_executor(cls, executor: "Executor", **kwargs) -> Self:
        # get ssh port for docker container
        ports_mapping: dict[int, int] = kwargs["ports_mapping"]
        ssh_port: int = None
        for internal in ports_mapping.keys():
            if internal == 22:
                ssh_port = ports_mapping[internal]

        ssh_connect_cmd = f"ssh root@{executor.executor_ip_address} -p {ssh_port}"
        return cls(
            executor_id=executor.id,
            ssh_connect_cmd=ssh_connect_cmd,
            **executor.get_specs_for_pod(),
            **kwargs,
        )
