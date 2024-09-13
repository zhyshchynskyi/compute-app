from typing import Annotated
from fastapi import Depends

from models.base_model import BaseModel, BaseDao


class User(BaseModel, table=True):
    name: str
    email: str
    password: str


class UserDao(BaseDao):
    def save(self, user: User) -> User:
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)

        return user


UserDaoDep = Annotated[UserDao, Depends(UserDao)]
