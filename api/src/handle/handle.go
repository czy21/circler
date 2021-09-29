package handle

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func ResponseWrapper() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("sss")
	}
}
