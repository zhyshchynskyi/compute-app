from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class BasePod(BaseModel):
    container_name: str
    volume_name: str
    ports_mapping: dict


class PodCreateRequest(BaseModel):
    name: str
    description: Optional[str] = None

class PodUpdateRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class PodResponse(BasePod):
    id: UUID
    server_port: int
    server_ip: str
