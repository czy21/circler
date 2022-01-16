import humps
from flask import request

import app.util.response
from app.bootstrap.context import ApplicationContext
from app.controller.base import BaseController


class Controller(BaseController):

    def __init__(self, context: ApplicationContext):
        @context.app.route('/user/search', methods=["POST"])
        def user_search():
            param = humps.decamelize(request.get_json())

            db_master = context.datasource["master"]
            # db_master.execute("insert into ent_sys_user(id,account,user_name,department_id)values({0},{1},{2},{3})".format("uuid()", param["seq"].__repr__(), param["seq"].__repr__(), repr("91ea4dce-468c-11ec-b4b3-0242ac120004")))
            cursor = db_master.execute(
                "select * from ent_sale limit 100"
            )
            rets = [dict(t) for t in cursor]
            db_master.close()
            return app.util.response.success(rets)
