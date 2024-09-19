from typing import Dict, Any
from passlib.context import CryptContext

from models.base_model import BaseModel

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(BaseModel, table=True):
    name: str
    email: str
    password: str

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
