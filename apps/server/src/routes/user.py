from fastapi import APIRouter, HTTPException

from typings.user import CreateUserDto
from models.user import User, UserDaoDep

users_router = APIRouter()


@users_router.post("")
async def create_user(payload: CreateUserDto, user_dao: UserDaoDep):
    try:
        user = User(
            name=payload.name,
            email=payload.email,
            password=payload.password
        )

        user = user_dao.save(user)

        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
