from flask import Blueprint

bp = Blueprint(name="volume", import_name=__name__)


@bp.route(rule="/volume/search", methods=["GET"])
def search():
    return "0.3"
