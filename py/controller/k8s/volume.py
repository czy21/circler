from flask import Blueprint, jsonify

bp = Blueprint(name="volume", import_name=__name__)


@bp.route(rule="/volume/search", methods=["GET"])
def search():
    result = {
        "data": {},
        "timestamp": 11212
    }
    return jsonify(result)
