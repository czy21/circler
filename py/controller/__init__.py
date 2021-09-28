from flask import Flask

from controller.k8s import volume


def register(app: Flask):
    app.register_blueprint(blueprint=volume.bp, url_prefix="/k8s")
