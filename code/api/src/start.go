package main

import (
	"github.com/czyhome/circler/src/controller"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	controller.Init(router)
	_ = router.Run(":8080")
}
