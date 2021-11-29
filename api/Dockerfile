# syntax=docker/dockerfile:1

##
## Build
##
FROM golang:alpine as build

WORKDIR /app

COPY . .

RUN go mod download && go build -o /docker-gs-ping

##
## Deploy
##
FROM debian:stable

WORKDIR /

COPY --from=build /docker-gs-ping /docker-gs-ping

EXPOSE 8080

USER root:root

ENTRYPOINT ["/docker-gs-ping"]