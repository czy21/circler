from flask import Blueprint

from decorator import response

bp = Blueprint(name="k8s", import_name=__name__)


@bp.route(rule="/volume/search", methods=["GET"])
@response.wrapper
def search():
    return {"name": "nishishei"}


@bp.route(rule="/cluster/search", methods=["GET"])
@response.wrapper
def cluster_search():
    return {"name": "hello"}
