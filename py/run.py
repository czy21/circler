from flask import Flask

import controller

app = Flask(__name__)
if __name__ == '__main__':
    controller.register(app)
    app.run(debug=True, port=8080)
