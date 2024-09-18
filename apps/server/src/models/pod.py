from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import JSON, Column
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from models.executor import Executor


class Pod(SQLModel, table=True):
    executor_id: UUID = Field(foreign_key="executor.id", primary_key=True)
    container_name: str
    volume_name: str
    ports_mapping: str = Field(sa_column=Column(type_=JSONB(astext_type=JSON()), nullable=False))

    executor: "Executor" = Relationship(back_populates="pod")

    # Needed for Column(JSON)
    class Config:
        arbitrary_types_allowed = True
