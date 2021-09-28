from flask import Flask

from controller import k8s as k8s_controller


def register(app: Flask):
    app.register_blueprint(k8s_controller.bp)
