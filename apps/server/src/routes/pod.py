from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from dtos.pod import PodCreateRequest, PodResponse, PodUpdateRequest
from models import User
from services.pod import PodService
from utils.auth import authenticateDeps

pods_router = APIRouter()


@pods_router.get(
    "/",
    response_description="Get all available pods",
    summary="Get all pods",
    description="Endpoint to get all available pods.",
    response_model=list[PodResponse],
    responses={
        200: {"description": "Pods retrieved successfully"},
        500: {"description": "Internal server error"},
    },
)
async def get_pods(
    pod_service: Annotated[PodService, Depends(PodService)], user: Annotated[User, authenticateDeps]
):
    """Endpoint to get all available pods."""
    available_pods = await pod_service.get_available_pods(user.id)
    return available_pods


@pods_router.get(
    "/{pod_uuid}",
    response_description="Get a pod by ID",
    summary="Get pod by ID",
    description="Endpoint to get a specific pod by its ID.",
    response_model=PodResponse,
    responses={
        200: {"description": "Pod retrieved successfully"},
        404: {"description": "Pod not found"},
        500: {"description": "Internal server error"},
    },
)
async def get_pod_by_id(
    pod_uuid: UUID,
    pod_service: Annotated[PodService, Depends(PodService)],
    user: Annotated[User, authenticateDeps],
):
    """Endpoint to get a specific pod by its ID."""
    pod = await pod_service.get_pod_by_id(user.id, pod_uuid)
    if not pod:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pod not found",
        )
    return pod


@pods_router.post(
    "/",
    response_description="Create a new pod",
    summary="Create pod",
    description="Endpoint to create a new pod with the provided details.",
    response_model=PodResponse,
    responses={
        201: {"description": "Pod created successfully"},
        400: {"description": "Invalid input"},
        500: {"description": "Internal server error"},
    },
)
async def create_pod(
    payload: PodCreateRequest,
    pod_service: Annotated[PodService, Depends(PodService)],
    user: Annotated[User, authenticateDeps],
):
    """Endpoint to create a new pod."""
    try:
        new_pod = await pod_service.create_pod(user, payload)
        return new_pod
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@pods_router.put(
    "/{pod_uuid}",
    response_description="Update an existing pod",
    summary="Update pod",
    description="Endpoint to update an existing pod with the provided details.",
    response_model=PodResponse,
    responses={
        200: {"description": "Pod updated successfully"},
        400: {"description": "Invalid input"},
        404: {"description": "Pod not found"},
        500: {"description": "Internal server error"},
    },
)
async def update_pod(
    pod_uuid: UUID,
    payload: PodUpdateRequest,
    pod_service: Annotated[PodService, Depends(PodService)],
    user: Annotated[User, authenticateDeps],
):
    """Endpoint to update an existing pod."""
    try:
        updated_pod = await pod_service.update_pod(user, pod_uuid, payload)
        return updated_pod
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@pods_router.delete(
    "/{pod_uuid}",
    response_description="Delete an existing pod",
    summary="Delete pod",
    description="Endpoint to delete an existing pod.",
    responses={
        204: {"description": "Pod deleted successfully"},
        404: {"description": "Pod not found"},
        500: {"description": "Internal server error"},
    },
)
async def delete_pod(
    pod_uuid: UUID,
    pod_service: Annotated[PodService, Depends(PodService)],
    user: Annotated[User, authenticateDeps],
):
    """Endpoint to delete an existing pod."""
    try:
        await pod_service.delete_pod(user, pod_uuid)
        return None
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )
