from datetime import datetime, date

import flask

from app.util import date as date_util


class JSONDecoder(flask.json.JSONDecoder):
    pass


class JSONEncoder(flask.json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return date_util.datetime_to_timestamp(obj)
        elif isinstance(obj, date):
            return date_util.date_to_timestamp(obj)
        else:
            return super().default(obj)
