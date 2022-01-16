import logging

import flask
from sqlalchemy.orm import Session


class ApplicationContext:
    def __init__(self,
                 properties: dict = None,
                 app: flask.Flask = None,
                 datasource: dict[str, Session] = None,
                 logger: logging.Logger = None
                 ):
        self.properties = properties
        self.logger = logger
        self.app = app
        self.datasource = datasource
