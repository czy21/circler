from flask import Blueprint

bp = Blueprint("k8s", __name__)


@bp.route("/user/load", methods=["GET"])
def load():
    return "hello"
