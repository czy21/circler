# syntax=docker/dockerfile:1

##
## Build
##
FROM golang:1.17-alpine as build
ENV GOPROXY=http://nexus.cluster.com/repository/go-proxy/
WORKDIR /app

COPY . .

RUN go mod download && CGO_ENABLED=0 go build -o /docker-gs-ping

##
## Deploy
##
FROM debian:10.11-slim
USER root:root

WORKDIR /

COPY --from=build /docker-gs-ping /docker-gs-ping

EXPOSE 8080

CMD ["/docker-gs-ping"]