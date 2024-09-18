import logging

from celery import Celery

from core.config import config as settings
from daos.executor import ExecutorDao
from models.executor import Executor
from protocol.validator_requests import ExecutorSpecRequest
from services.ioc import ioc

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(levelname)s | %(message)s")


celery = Celery(__name__)
celery.conf.broker_url = settings.REDIS_BACKEND_URL
celery.conf.result_backend = settings.REDIS_BACKEND_URL


@celery.task(name="save_executor_into_db")
def save_executor_into_db(executor_spec_str: str):
    try:
        executor_spec = ExecutorSpecRequest.model_validate_json(executor_spec_str)

        logger.info(f"Storing executor into DB: {executor_spec}")

        # Create an Executor instance from the executor_spec
        executor = Executor(
            miner_hotkey=executor_spec.miner_hotkey,
            validator_hotkey=executor_spec.validator_hotkey,
            executor_id=executor_spec.executor_uuid,
            executor_ip_address=executor_spec.executor_ip,
            executor_ip_port=executor_spec.executor_port,
            specs=executor_spec.specs.model_dump(),
        )

        # Use ExecutorDao to upsert the executor into the database
        executor_dao: ExecutorDao = ioc["ExecutorDao"]
        executor_dao.upsert(executor)
    except Exception as e:
        # Log the exception if needed
        logger.warning(f"Error saving executor into DB: {e}")
