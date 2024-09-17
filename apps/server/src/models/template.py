from typing import Annotated, Optional, List, Dict
from uuid import UUID
import enum
from fastapi import Depends

from sqlmodel import select, Field, Column, Enum, Relationship
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import JSON

from models.base_model import BaseModel, BaseDao


class TemplateType(str, enum.Enum):
    serverless = "serverless"
    pod = 'pod'


class TemplateComputeType(str, enum.Enum):
    nvidia_gpu = "nvidia gpu"
    amd_gpu = 'amd gpu'
    cpu = 'cpu'


class TemplateVisibility(str, enum.Enum):
    public = "public"
    private = "private"


class Template(BaseModel, table=True):
    name: str
    description: Optional[str]
    template_type: TemplateType = Field(sa_column=Column(Enum(TemplateType)))
    compute_type: TemplateComputeType = Field(sa_column=Column(Enum(TemplateComputeType)))
    container_image: str
    container_start_command: Optional[str]
    volume_mount_path: Optional[str]
    template_visibility: TemplateVisibility = Field(sa_column=Column(Enum(TemplateVisibility)))
    environment_variables: Optional[Dict] = Field(sa_column=Column(type_=JSONB(astext_type=JSON()), nullable=True))
    is_deleted: bool = Field(default=False, index=True)

    pods: list["Pod"] = Relationship(back_populates="template")


class TemplateDao(BaseDao):
    def find_all(self) -> list[Template]:
        return self.session.exec(select(Template)).all()

    def find_by_id(self, id: UUID) -> Optional[Template]:
        return self.session.exec(select(Template).where(Template.id == id)).first()


TemplateDaoDep = Annotated[TemplateDao, Depends(TemplateDao)]
