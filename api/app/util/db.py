import os

from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import Session

from app.util import dict


def get_engine(key="master"):
    ds_dict = dict_util.group("datasource", 1, os.environ)
    return Session(create_engine(**ds_dict.get(key)))
