import datetime
from functools import wraps

import humps


def wrapper(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        return {
            "data": humps.camelize(f(*args, **kwargs)),
            "timestamp": int(datetime.datetime.now().timestamp() * 1000)
        }

    return decorated_function
