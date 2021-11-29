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
FROM gcr.io/distroless/base-debian10
WORKDIR /

COPY --from=build /docker-gs-ping /docker-gs-ping
EXPOSE 8080

USER nonroot:nonroot
CMD ["/docker-gs-ping"]