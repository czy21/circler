import flask
import humps


def success(obj, underscore_to_camelcase=True):
    return flask.jsonify(humps.camelize(obj) if underscore_to_camelcase else obj)
