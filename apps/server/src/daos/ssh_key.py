from uuid import UUID

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
