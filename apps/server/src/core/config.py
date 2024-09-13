from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    model_config = SettingsConfigDict()
    PROJECT_NAME: str = "compute-app-server"

    DB_URI: str = Field(env="DB_URI")
    # DEBUG: bool = Field(env="DEBUG", default=False)

    PORT: int = Field(env="PORT", default=8000)

    class Config:
        env_file = ".env"

config = Config()
