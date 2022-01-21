FROM python:3.10-slim
WORKDIR /home/app
COPY . /home/app/
ENV mirror_url = http://nexus.cluster.com/repository/apt-debian11.x-proxy
RUN echo ' \
deb ${mirror_url}/debian/ bullseye main non-free contrib
deb-src ${mirror_url}/debian/ bullseye main non-free contrib
deb ${mirror_url}/debian-security/ bullseye-security main
deb-src ${mirror_url}/debian-security/ bullseye-security main
deb ${mirror_url}/debian/ bullseye-updates main non-free contrib
deb-src ${mirror_url}/debian/ bullseye-updates main non-free contrib
deb ${mirror_url}/debian/ bullseye-backports main non-free contrib
deb-src ${mirror_url}/debian/ bullseye-backports main non-free contrib' > /etc/apt/source.list

RUN apt-get update && apt-get install gcc -y && apt-get clean
RUN pip install --trusted-host nexus.cluster.com --index-url http://nexus.cluster.com/repository/pypi-proxy/simple/ --requirement requirements.txt --no-cache-dir

VOLUME ["/home/app/data/","home/app/config/"]
CMD ["gunicorn","--config","config/gunicorn.conf.py","--chdir","/home/app","main:application"]