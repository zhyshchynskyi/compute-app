from typing import Optional
from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import SQLModel, Field

from core.db import SessionDep


class BaseModel(SQLModel):
    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow},
    )


class BaseDao:
    def __init__(self, session: SessionDep):
        self.session = session
