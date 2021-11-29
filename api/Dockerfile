FROM golang:alpine
ENV WORKDIR=/home/app
ENV DISTDIR=${WORKDIR}/dist
ENV MAINBIN=${DISTDIR}/app
WORKDIR ${WORKDIR}

COPY . .

RUN ls -al
RUN mkdir -p ${DISTDIR} && go build -o ${MAINBIN} .

EXPOSE 8080

ENTRYPOINT ["${MAINBIN}"]