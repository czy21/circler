from src.app import app


@app.route('/user/load', methods=["POST"])
def load():
    return '用户加载'


@app.route('/user/upload', methods=["POST"])
def upload():
    return '用户上传'
