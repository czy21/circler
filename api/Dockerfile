##
## Build
##
FROM golang:1.17-alpine as build
ENV GOPROXY=http://nexus.cluster.com/repository/go-proxy/
WORKDIR /home/app

COPY . .

RUN go mod download && go build -o /main

##
## Deploy
##
FROM golang:1.17-alpine
USER root:root

WORKDIR /home/app

COPY --from=build /main /home/app/main
RUN apk update && apk add mysql-client postgresql-client
EXPOSE 8080
VOLUME ["/home/app/config","/home/app/data"]
CMD ["/home/app/main"]