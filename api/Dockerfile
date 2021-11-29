# syntax=docker/dockerfile:1

##
## Build
##
FROM golang:alpine as build
ENV GOPROXY=http://nexus.cluster.com/repository/go-proxy/
WORKDIR /app

COPY . .

RUN go mod download && CGO_ENABLED=0 go build -o /docker-gs-ping

##
## Deploy
##
FROM debian:stable

WORKDIR /

COPY --from=build /docker-gs-ping /docker-gs-ping

EXPOSE 8080

USER root:root

CMD ["sleep 100000"]