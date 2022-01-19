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
        @context.app.route('/project/create', methods=["POST"])
        def project_create():
            return app.util.response.success({
                "list": [
                    {
                        "id": 1,
                        "name": "erp-local"
                    }
                ]
            })

        @context.app.route('/project/build', methods=["POST"])
        def project_build():
            return app.util.response.success({
                "status": "success"
            })

        @context.app.route('/project/deploy', methods=["POST"])
        def project_deploy():
            return app.util.response.success({
                "status": "success"
            })
