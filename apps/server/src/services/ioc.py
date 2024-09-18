from core.db import get_db
from daos.executor import ExecutorDao

ioc = {}


def initiate_daos():
    session = next(get_db())
    ioc["ExecutorDao"] = ExecutorDao(session=session)


def initiate_services():
    pass


initiate_daos()
initiate_services()
