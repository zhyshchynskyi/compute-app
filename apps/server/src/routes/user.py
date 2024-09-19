from fastapi import APIRouter, HTTPException

from dtos.user import CreateUserDto, LoginUserDto
from models.user import User
from daos.user import UserDaoDep
from utils.jwt import jwt_access_security
from utils.auth import authenticateDeps

users_router = APIRouter()


@users_router.post("")
async def singup(payload: CreateUserDto, user_dao: UserDaoDep):
    try:
        user = user_dao.find_by_email(payload.email)
        if (user):
            raise HTTPException(status_code=400, detail="User already exists with the same email")

        user = User(
            name=payload.name,
            email=payload.email,
            password=payload.password
        )

        user = user_dao.save(user)

        return {
            "msg": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@users_router.post("/login")
async def login(payload: LoginUserDto, user_dao: UserDaoDep):
    try:
        user = user_dao.find_by_email(payload.email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if not User.verify_password(user.password, payload.password):
            raise HTTPException(status_code=401, detail="Unauthorized")

        access_token = jwt_access_security.create_access_token(subject=user.to_json())

        return {
            "user": user,
            "token": access_token,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@users_router.get("/me")
async def me(user=authenticateDeps):
    try:
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
