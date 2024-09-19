from typing import Annotated
from fastapi import Depends

from sqlmodel import select

from daos.base import BaseDao
from models.user import User


class UserDao(BaseDao):
    def save(self, user: User) -> User:
        user.password = User.hash_password(user.password)

        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)

        return user

    def find_by_email(self, email: str) -> User:
        return self.session.exec(select(User).where(User.email == email)).first()


UserDaoDep = Annotated[UserDao, Depends(UserDao)]
