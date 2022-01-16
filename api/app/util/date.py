from datetime import datetime


def datetime_to_timestamp(val: datetime):
    return int(val.timestamp() * 1000)


def date_to_timestamp(val: datetime.date):
    return datetime_to_timestamp(datetime.combine(val, datetime.min.time()))
