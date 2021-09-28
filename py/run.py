import json

from flask import Flask, Response

import controller

app = Flask(__name__)


@app.after_request
def after(response: Response):
    result = {
        "timestamp": 111
    }
    if response.is_json:
        result["data"] = response.get_json()
    else:
        response.__setattr__("content_type", 'application/json')
        result["data"] = response.get_data().decode("utf-8")
    response.data = json.dumps(result)
    return response


if __name__ == '__main__':
    controller.register(app)
    app.run(debug=True, port=8080)
