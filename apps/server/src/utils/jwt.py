from core.config import config

from fastapi_jwt import JwtAccessBearer

jwt_access_security = JwtAccessBearer(secret_key=config.JWT_SECRET_KEY, auto_error=True)
