##
## Build
##

FROM golang:alpine as build
ENV GOPROXY=http://nexus.cluster.com/repository/go-proxy/
ENV WORKDIR=/app
ENV MAINBIN=${WORKDIR}/main
USER root:root
WORKDIR ${WORKDIR}

COPY . .

RUN go mod download && go build -o ${MAINBIN}

##
## Deploy
##
FROM gcr.io/distroless/base-debian10
WORKDIR ${WORKDIR}

COPY --from=build ${MAINBIN} ${MAINBIN}

EXPOSE 8080
CMD [${MAINBIN}]