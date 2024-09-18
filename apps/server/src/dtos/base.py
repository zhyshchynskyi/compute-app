from pydantic import BaseModel


class BaseResponse(BaseModel):
    success: bool
    message: str | None = None

    class Config:
        schema_extra = {
            "example": {"success": True, "message": "Operation completed successfully."}
        }
