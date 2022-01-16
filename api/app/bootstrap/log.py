import logging

from flask.logging import default_handler

from app.bootstrap.context import ApplicationContext


def init(context: ApplicationContext):
    logger = context.app.logger
    logger.setLevel(logging.DEBUG if context.app.debug else logging.INFO)
    default_handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s %(process)d %(thread)d --- [%(threadName)s] [%(module)s.%(funcName)s] : %(message)s'))
    logger.addHandler(default_handler)
    context.logger = logger
