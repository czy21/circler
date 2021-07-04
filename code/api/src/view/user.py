from src.app import app


@app.route('/user/load', methods=["POST"])
def user_load():
    return '用户加载'
