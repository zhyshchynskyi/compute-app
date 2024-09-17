from pydantic import BaseModel
from core.config import Config

class AuthJWTSettings(BaseModel):
    authjwt_secret_key: str = "Config.JWT_SECRET_KEY"
