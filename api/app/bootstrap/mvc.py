import importlib
import inspect

import app.controller.base
import app.json
import app.util.pkg
from app.bootstrap.context import ApplicationContext


def init(context: ApplicationContext):
    context.app.json_encoder = app.json.JSONEncoder
    context.app.json_decoder = app.json.JSONDecoder
    scanned_modules = app.util.pkg.scan(path=app.controller.__path__, prefix="app.controller")
    for t in scanned_modules:
        for name, class_ in inspect.getmembers(importlib.import_module(t.name), lambda a: inspect.isclass(a) and a.__base__ is app.controller.base.BaseController):
            context.logger.info(class_)
            class_(context=context)
