package main

import (
	"github.com/czyhome/circler/src/controller"
	"github.com/czyhome/circler/src/core"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(core.ErrorHandle())
	//r.Use(gin.Logger())
	//r.Use(handle.ResponseHandle())
	controller.Init(r)
	_ = r.Run(":8080")
}
