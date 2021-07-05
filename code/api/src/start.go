package main

import (
	"czy-erp.com/src/controller"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	controller.InitUserRouter(router)
	_ = router.Run(":8080")
}
