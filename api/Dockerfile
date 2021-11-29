FROM golang:alpine
ENV WORKDIR=/home/app
ENV DISTDIR=${WORKDIR}/dist
ENV MAINBIN=${DISTDIR}/app
WORKDIR ${WORKDIR}

COPY . .

RUN mkdir -p ${DISTDIR} && go build -o ${MAINBIN} .
RUN ls -al

EXPOSE 8080

ENTRYPOINT ["${MAINBIN}"]