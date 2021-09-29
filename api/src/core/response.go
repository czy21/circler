package core

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func ResponseHandle() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("sss")
	}
}
