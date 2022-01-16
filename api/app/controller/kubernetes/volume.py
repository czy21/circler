from flask import request

from app.bootstrap.context import ApplicationContext
from app.controller.base import BaseController


class Controller(BaseController):

    def __init__(self, context: ApplicationContext):
        @context.app.route('/kubernetes/volume/search', methods=["POST"])
        def volume_search():
            context.app.logger.info("hello")
            return {}

        @context.app.route('/update', methods=["GET"])
        def volume_update():
            print(request.query_string)
            return {}
