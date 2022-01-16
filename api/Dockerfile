FROM python:3-alpine
WORKDIR /home/app
COPY . /home/app/

RUN pip install --trusted-host nexus.cluster.com --index-url http://nexus.cluster.com/repository/pypi-proxy/simple/ --requirement requirements.txt --no-cache-dir

VOLUME ["/home/app/data/","home/app/config/"]
CMD ["gunicorn","--config","config/gunicorn.conf.py","--chdir","/home/app","main:application"]