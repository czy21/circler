from flask import Flask
import config

app = Flask(__name__)

app.config['CELERY_BROKER_URL'] = config.REDIS_URI
app.config['CELERY_RESULT_BACKEND'] = config.REDIS_URI
