from typing import Annotated, Optional, List, Dict
from uuid import UUID
import enum
from fastapi import Depends
from decimal import Decimal

from sqlmodel import select, Field, Column, Enum, Relationship, Numeric
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import JSON

from models.base_model import BaseModel, BaseDao
from models import User, Template, Executor


class PodStatus(str, enum.Enum):
    running = 'running'
    stopped = 'stopped'


class PodType(str, enum.Enum):
    cpu = 'cpu'
    gpu = 'gpu'


class Pod(BaseModel, table=True):
    name: str
    price: Optional[Decimal] = Field(default=None, sa_type=Numeric(precision=5, scale=2), nullable=True)
    status: PodStatus = Field(sa_column=Column(Enum(PodStatus)))
    type: PodType = Field(sa_column=Column(Enum(PodType)))

    user_id: UUID = Field(foreign_key="user.id", index=True, ondelete='CASCADE')
    executor_id: UUID = Field(foreign_key="executor.id", index=True, ondelete='CASCADE')
    template_id: UUID = Field(foreign_key="template.id", index=True, ondelete='CASCADE')
    template_config: Optional[Dict] = Field(sa_column=Column(type_=JSONB(astext_type=JSON()), nullable=True))
    gpu_count: Optional[int]
    isinstance_pricing: Optional[Dict] = Field(sa_column=Column(type_=JSONB(astext_type=JSON()), nullable=True))

    container_name: str
    volume_name: str
    portMaps: Dict = Field(sa_column=Column(type_=JSONB(astext_type=JSON()), nullable=False))

    user: User = Relationship(back_populates="pods")
    executor: Executor = Relationship(back_populates="pods")
    template: Template = Relationship(back_populates="pods")


class PodDao(BaseDao):
    def create(self, pod: Pod) -> Pod:
        self.session.add(pod)
        self.session.commit()
        self.session.refresh(pod)

        return pod
        
    def find_all(self) -> list[Pod]:
        return self.session.exec(select(Pod)).all()

    def find_by_id(self, id: UUID) -> Optional[Pod]:
        return self.session.exec(select(Pod).where(Pod.id == id)).first()


PodDaoDep = Annotated[PodDao, Depends(PodDao)]
