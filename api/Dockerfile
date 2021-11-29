# syntax=docker/dockerfile:1

##
## Build
##
FROM golang:alpine as build
ENV GOPROXY=http://nexus.cluster.com/repository/go-proxy/
WORKDIR /app

COPY . .

RUN go mod download && go build -o /docker-gs-ping

##
## Deploy
##
FROM golang:alpine

WORKDIR /

COPY --from=build /docker-gs-ping /docker-gs-ping

EXPOSE 8080

USER root:root

CMD ["/docker-gs-ping"]