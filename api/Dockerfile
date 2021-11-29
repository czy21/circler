##
## Build
##

FROM golang:alpine as build
ENV GOPROXY=http://nexus.cluster.com/repository/go-proxy/
ENV WORKDIR=/home/app
WORKDIR ${WORKDIR}

COPY . .

RUN mkdir -p /home/app && go mod download && go build -o ${WORKDIR}/main

##
## Deploy
##
FROM gcr.io/distroless/base-debian10
WORKDIR ${WORKDIR}

COPY --from=build ${WORKDIR}/main ${WORKDIR}/main

EXPOSE 8080
CMD [/home/app/main]