import io
import json
from pathlib import Path

import humps
from flask import Blueprint, request, current_app

import util.path
from decorator import response
from model import cluster

bp = Blueprint(name="k8s", import_name=__name__)


@bp.post(rule="/cluster/search")
@response.wrapper
def cluster_search():
    return json.dump(util.path.get_cluster())


@bp.post(rule="/cluster/create")
@response.wrapper
def cluster_create():
    param = cluster.Cluster(**humps.decamelize(request.get_json()))
    clusters = util.path.get_cluster()
    m = list(filter(lambda t: t.name == param.name, clusters))
    if len(m) > 0:
        raise Exception(" ".join([param.name, " exists"]))
    meta_file = Path(current_app.root_path).joinpath("data", param.name, "meta.json")
    config_file = Path(current_app.root_path).joinpath("data", param.name, "config.yaml")
    meta_file.parent.mkdir(parents=True, exist_ok=True)
    meta_file.touch()
    config_file.touch()
    with io.open(config_file, "w+", encoding="utf-8", newline="\n") as c:
        c.write(param.content)
    with io.open(meta_file, "w+", encoding="utf-8", newline="\n") as m:
        param.config_path = "./" + config_file.name
        param.content = None
        json.dump(param.__dict__, m)
    return {"name": "hello"}
