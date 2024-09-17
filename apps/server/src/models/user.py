from typing import Annotated, Dict, Any
from fastapi import Depends
from passlib.context import CryptContext

from sqlmodel import Relationship, select

from models.base_model import BaseModel, BaseDao

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(BaseModel, table=True):
    name: str
    email: str
    password: str

    pods: list["Pod"] = Relationship(back_populates="user")

    @classmethod
    def hash_password(self, password: str):
        """Hash a password for storing."""
        return pwd_context.hash(password)

    @classmethod
    def verify_password(self, hashed_password: str, plain_password: str):
        """Verify a stored password against one provided by user"""
        return pwd_context.verify(plain_password, hashed_password)

    def to_json(self) -> Dict[str, Any]:
        return {
            "id": str(self.id),
            "name": self.name,
            "email": self.email,
        }


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
