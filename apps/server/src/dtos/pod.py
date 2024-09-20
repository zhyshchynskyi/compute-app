from uuid import UUID

from pydantic import BaseModel


class BasePod(BaseModel):
    ports_mapping: dict
    pod_name: str
    ssh_connect_cmd: str
    gpu_name: str
    gpu_count: str
    cpu_name: str
    ram_total: int


class PodCreateRequest(BaseModel):
    name: str
    description: str | None = None


class PodUpdateRequest(BaseModel):
    name: str | None = None
    description: str | None = None


class PodResponse(BasePod):
    id: UUID
