from typing import Annotated

from fastapi import APIRouter, Depends, WebSocket
from consumers.validator_consumer import ValidatorConsumer


validator_router = APIRouter()


@validator_router.websocket("/{validator_hotkey}")
async def validator_interface(websocket: WebSocket, validator_hotkey: str):
    validator_consumer = ValidatorConsumer(websocket, validator_hotkey)
    await validator_consumer.connect()
    await validator_consumer.handle()
