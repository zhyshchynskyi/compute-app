from typing import TYPE_CHECKING
from uuid import UUID

from sqlmodel import Field, Relationship
from models.base_model import BaseModel


if TYPE_CHECKING:
    from models.user import User


class SshKey(BaseModel, table=True):
    name: str
    public_key: str
    user_id: UUID = Field(foreign_key="user.id", ondelete="CASCADE", index=True)

    user: "User" = Relationship(back_populates="ssh_keys")
