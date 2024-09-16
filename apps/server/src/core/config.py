from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    model_config = SettingsConfigDict()
    PROJECT_NAME: str = "compute-app-server"

    DB_URI: str = Field(env="DB_URI")
    # DEBUG: bool = Field(env="DEBUG", default=False)

    PORT: int = Field(env="PORT", default=8000)

    REDIS_BACKEND_URL: str = Field(env="REDIS_BACKEND_URL", default="redis://localhost:6379")

    class Config:
        env_file = ".env"

config = Config()
