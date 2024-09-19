from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

from dtos.base import BaseResponse
from dtos.executor import (
    ExecutorRentFailedResponse,
    ExecutorRentSuccessResponse,
    RentExecutorRequest,
)
from models.executor import Executor
from models.user import User
from services.executor import ExecutorService
from utils.auth import authenticateDeps

executors_router = APIRouter()


@executors_router.get(
    "",
    response_description="List all available executors",
    summary="Get all available executors",
    description="Endpoint to retrieve all executors that are not currently rented.",
    response_model=list[Executor],
    responses={
        200: {"description": "List of available executors"},
        500: {"description": "Internal server error"},
    },
)
async def get_available_executors(
    executor_service: Annotated[ExecutorService, Depends(ExecutorService)],
):
    """Endpoint to get all available executors."""
    try:
        # Fetch all available executors
        available_executors = executor_service.get_available_executors()
        print(available_executors)

        # If successful
        return available_executors
    except Exception as e:
        print(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"success": False, "message": str(e)},
        )


@executors_router.post(
    "/{executor_uuid}/rent",
    response_description="Rent executor machine",
    summary="Rent executor",
    description="Endpoint to rent executor machine with the provided details.",
    response_model=ExecutorRentSuccessResponse | ExecutorRentFailedResponse,
    responses={
        201: {"description": "Executor rented successfully"},
        400: {"description": "Invalid input"},
        500: {"description": "Internal server error"},
    },
)
async def rent(
    executor_uuid: UUID,
    payload: RentExecutorRequest,
    executor_service: Annotated[ExecutorService, Depends(ExecutorService)],
    user: Annotated[User, authenticateDeps]
):
    """Endpoint to rent executor machine."""
    try:
        await executor_service.rent_executor(user, payload, executor_uuid)

        # If successful
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"success": True, "message": "Executor successfully rented"},
        )
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"success": False, "message": str(e)},
        )


@executors_router.delete(
    "/{executor_uuid}/rent",
    response_description="Remove rent of executor machine",
    summary="Remove rent from executor",
    description="Endpoint to remove the rent status of an executor machine.",
    response_model=BaseResponse,
    responses={
        204: {"description": "Executor rent removed successfully"},
        500: {"description": "Internal server error"},
    },
)
async def unrent(
    executor_uuid: UUID, executor_service: Annotated[ExecutorService, Depends(ExecutorService)], user: Annotated[User, authenticateDeps]
):
    """Endpoint to rent executor machine."""
    try:
        # Assuming some logic here to rent the executor
        await executor_service.remove_rent(user, executor_uuid)

        # If successful
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"success": True, "message": "Executor successfully unrented"},
        )
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"success": False, "message": str(e)},
        )
