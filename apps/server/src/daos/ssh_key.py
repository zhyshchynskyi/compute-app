from uuid import UUID
from pydantic import BaseModel
from sqlmodel import select

from daos.base import BaseDao
from models.ssh_key import SshKey
from models.user import User


class SshKeyDao(BaseDao):
    def save(self, ssh_key: SshKey) -> SshKey:
        self.session.add(ssh_key)
        self.session.commit()
        self.session.refresh(ssh_key)
        return ssh_key

    def find_my_ssh_key_by_id(self, user: User, id: UUID) -> SshKey | None:
        return self.session.exec(select(SshKey).where(SshKey.id == id, SshKey.user_id == user.id)).first()

    def find_my_ssh_keys(self, user: User) -> list[SshKey]:
        return self.session.exec(select(SshKey).where(SshKey.user_id == user.id)).all()

    def update_my_ssh_key(self, user: User, id: UUID, new_data: BaseModel) -> SshKey | None:
        ssh_key = self.find_my_ssh_key_by_id(user, id)
        if not ssh_key:
            return None

        for key, value in new_data.model_dump().items():
            setattr(ssh_key, key, value)

        self.session.commit()
        self.session.refresh(ssh_key)

        return ssh_key

    def delete_my_ssh_key(self, user: User, id: UUID) -> SshKey | None:
        ssh_key = self.find_my_ssh_key_by_id(user, id)
        if not ssh_key:
            return None

        self.session.delete(ssh_key)
        self.session.commit()
        return ssh_key
