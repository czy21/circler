import humps
from flask import Blueprint, request

import util.path
from decorator import response
from model import cluster

bp = Blueprint(name="k8s", import_name=__name__)


@bp.post(rule="/cluster/search")
@response.wrapper
def cluster_search():
    a = util.path.get_cluster()

    return {"name": "hello"}


@bp.post(rule="/cluster/create")
@response.wrapper
def cluster_create():
    param = cluster.Cluster(**humps.decamelize(request.get_json()))
    clusters = util.path.get_cluster()
    m = list(filter(lambda t: t.name == param.name, clusters))
    if len(m) > 0:
        return "存在"

    return {"name": "hello"}
