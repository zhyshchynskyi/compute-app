from typing import Dict, Any, TYPE_CHECKING
from passlib.context import CryptContext

from sqlmodel import Relationship
from models.base_model import BaseModel

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

if TYPE_CHECKING:
    from models.ssh_key import SshKey


class User(BaseModel, table=True):
    name: str
    email: str
    password: str

    ssh_keys: list["SshKey"] = Relationship(back_populates="user")

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
