import datetime
from functools import wraps

from flask import jsonify


def wrapper(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        print(datetime.datetime.now().timestamp())
        return jsonify({
            "data": f(*args, **kwargs),
            "timestamp": int(datetime.datetime.now().timestamp() * 1000)
        })

    return decorated_function
