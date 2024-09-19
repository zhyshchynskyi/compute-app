import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
import uvicorn

from core.config import config
from routes.executor import executors_router
from routes.user import users_router
from routes.validator import validator_router
from routes.pod import pods_router
from routes.ssh_key import ssh_key_router

logging.getLogger('passlib').setLevel(logging.ERROR)
logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(levelname)s | %(message)s")

app = FastAPI(
    title=config.PROJECT_NAME,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return "Hello world"


app.include_router(users_router, prefix="/users")
app.include_router(validator_router, prefix="/validator")
app.include_router(executors_router, prefix="/executors")
app.include_router(pods_router, prefix="/pods")
app.include_router(ssh_key_router, prefix="/ssh-keys")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=config.PORT, reload=True)
