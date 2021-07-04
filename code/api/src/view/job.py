from src.app import app
from jenkins import Jenkins

server = Jenkins('http://192.168.2.21:8082', username='admin', password='')

@app.route('/job/load', methods=["POST"])
def job_load():
    return '用户加载'
