package main

import (
	"github.com/czyhome/circler/src/controller"
	"github.com/czyhome/circler/src/handle"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(handle.ResponseWrapper())
	controller.Init(r)
	_ = r.Run(":8080")
}
