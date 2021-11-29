##
## Build
##

FROM golang:alpine as build
ENV GOPROXY=http://nexus.cluster.com/repository/go-proxy/
WORKDIR /app

COPY . .

RUN go mod download && go build -o /main

##
## Deploy
##
FROM gcr.io/distroless/base-debian10
WORKDIR /

COPY --from=build /main /main

EXPOSE 8080
CMD ["/main"]