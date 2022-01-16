import humps
from flask import request

import app.util.response
from app.bootstrap.context import ApplicationContext
from app.controller.base import BaseController


class Controller(BaseController):

    def __init__(self, context: ApplicationContext):
        @context.app.route('/project/search', methods=["POST"])
        def project_search():
            return app.util.response.success({
                "list": [
                    {
                        "id": 1,
                        "name": "erp-local"
                    }
                ]
            })
