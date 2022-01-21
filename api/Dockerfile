FROM python:3.10-slim
WORKDIR /home/app
COPY . /home/app/

RUN echo ' \
deb http://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb http://mirrors.aliyun.com/debian-security/ bullseye-security main
deb-src http://mirrors.aliyun.com/debian-security/ bullseye-security main
deb http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib' > /etc/apt/source.list

RUN apt-get update && apt-get install gcc -y && apt-get clean
RUN pip install --trusted-host nexus.cluster.com --index-url http://nexus.cluster.com/repository/pypi-proxy/simple/ --requirement requirements.txt --no-cache-dir

VOLUME ["/home/app/data/","home/app/config/"]
CMD ["gunicorn","--config","config/gunicorn.conf.py","--chdir","/home/app","main:application"]