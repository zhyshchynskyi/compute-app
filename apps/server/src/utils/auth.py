from fastapi import HTTPException, Security, Depends
from fastapi_jwt import JwtAuthorizationCredentials

from models.user import UserDaoDep
from utils.jwt import jwt_access_security


async def authenticate(user_dao: UserDaoDep, credentials: JwtAuthorizationCredentials = Security(jwt_access_security)):
    user = user_dao.find_by_email(credentials.subject["email"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

authenticateDeps = Depends(authenticate)
