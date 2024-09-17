from pydantic import BaseModel


class CreateUserDto(BaseModel):
    name: str
    email: str
    password: str
    
class LoginUserDto(BaseModel):
    email: str
    password: str
