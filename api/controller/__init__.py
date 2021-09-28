from flask import Flask

from controller import k8s


def register(app: Flask):
    app.register_blueprint(blueprint=k8s.bp, url_prefix="/k8s")
