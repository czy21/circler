import io
import os
import pathlib

import flask
import yaml

import app.bootstrap.context
import app.bootstrap.datasource
import app.bootstrap.log
import app.bootstrap.mvc

with io.open(pathlib.Path(__file__).parent.joinpath("config/env.yml").as_posix(), "r", encoding="utf-8") as ef:
    properties = yaml.unsafe_load(ef.read())
# init application_context
context = app.bootstrap.context.ApplicationContext(properties=properties)

# init application
application = flask.Flask(context.properties["application_name"])
context.app = application
# init log
app.bootstrap.log.init(context=context)
# init datasource
app.bootstrap.datasource.init(context=context)
# init mvc
app.bootstrap.mvc.init(context=context)

os.environ.__setattr__("application_context", context)
