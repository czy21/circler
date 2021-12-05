package main

import (
	"github.com/czyhome/circler/controller"
	"github.com/czyhome/circler/core"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(core.ErrorHandle())
	r.Use(gin.Logger())
	r.Use(core.ResponseHandler())
	controller.InitRouter(r)
	_ = r.Run(":8080")
}
