# syntax=docker/dockerfile:1

##
## Build
##
FROM golang:1.17-alpine as build
ENV GOPROXY=http://nexus.cluster.com/repository/go-proxy/
WORKDIR /app

COPY . .

RUN go mod download && go build -o /docker-gs-ping

##
## Deploy
##
FROM golang:1.17-alpine
USER root:root

WORKDIR /

COPY --from=build /docker-gs-ping /docker-gs-ping
RUN apk update && apk add mysql-client postgresql-client
EXPOSE 8080

CMD ["/docker-gs-ping"]