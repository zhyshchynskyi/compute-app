from typing import Annotated
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException

from daos.ssh_key import SshKeyDao
from models.ssh_key import SshKey
from dtos.ssh_key import CreateSshKey
from utils.auth import authenticateDeps

ssh_key_router = APIRouter()


@ssh_key_router.post("")
async def register_ssh_key(
    payload: CreateSshKey,
    ssh_dao: Annotated[SshKeyDao, Depends(SshKeyDao)],
    user=authenticateDeps,
):
    try:
        ssh_key = SshKey(
            name=payload.name,
            public_key=payload.public_key,
            user_id=user.id,
        )

        ssh_key = ssh_dao.save(ssh_key)

        return ssh_key
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@ssh_key_router.get("/me")
async def find_my_ssh_keys(
    ssh_dao: Annotated[SshKeyDao, Depends(SshKeyDao)],
    user=authenticateDeps,
):
    try:
        return ssh_dao.find_my_ssh_keys(user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@ssh_key_router.get("/me/{id}")
async def find_one_my_ssh_key(
    id: UUID,
    ssh_dao: Annotated[SshKeyDao, Depends(SshKeyDao)],
    user=authenticateDeps,
):
    try:
        ssh_key = ssh_dao.find_my_ssh_key_by_id(user, id)
        if not ssh_key:
            raise HTTPException(status_code=404, detail="Ssh key not found")

        return ssh_key
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
