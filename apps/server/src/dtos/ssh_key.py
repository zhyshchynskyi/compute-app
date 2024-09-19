from pydantic import BaseModel


class CreateSshKey(BaseModel):
    name: str
    public_key: str
