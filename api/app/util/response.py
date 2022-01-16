import flask
import humps


def success(obj, underscore_to_camelcase=True):
    ret = {
        "data": obj
    }
    return flask.jsonify(humps.camelize(ret) if underscore_to_camelcase else ret)
