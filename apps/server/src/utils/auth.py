from fastapi import HTTPException, Security, Depends
from fastapi_jwt import JwtAuthorizationCredentials

from daos.user import UserDaoDep
from utils.jwt import jwt_access_security
from models import User


async def authenticate(user_dao: UserDaoDep, credentials: JwtAuthorizationCredentials = Security(jwt_access_security)) -> User:
    user = user_dao.find_by_email(credentials.subject["email"])
    print(user)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user

authenticateDeps = Depends(authenticate)
