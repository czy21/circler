from pathlib import Path

DB_NAME = "erp_local"
MONGO_URI = "mongodb://admin:Czy.190815@192.168.2.3:27017/"
MYSQL_URI = "mysql+pymysql://admin:Czy.190815@192.168.52.140:3306/{}".format(DB_NAME)
REDIS_URI = "redis://:Czy.190815@192.168.52.140:6379/0"
PROJECT_PATH = Path(".").resolve().as_posix()
