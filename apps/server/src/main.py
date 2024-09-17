import logging

import uvicorn
from fastapi import FastAPI

from core.config import config
from routes.user import users_router
from routes.validator import validator_router

logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(levelname)s | %(message)s")

app = FastAPI(
    title=config.PROJECT_NAME,
)


@app.get("/")
def health_check():
    return "Hello world"


app.include_router(users_router, prefix="/users")
app.include_router(validator_router, prefix="/validator")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=config.PORT, reload=True)
