import os
import time

from celery import Celery
from core.config import config as settings


celery = Celery(__name__)
celery.conf.broker_url = settings.REDIS_BACKEND_URL
celery.conf.result_backend = settings.REDIS_BACKEND_URL


@celery.task(name="create_task")
def create_task(task_type):
    time.sleep(int(task_type) * 10)
    return True