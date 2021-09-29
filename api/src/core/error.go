package core

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func ErrorHandle() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				var m = make(map[string]interface{})
				m["error"] = err
				m["timestamp"] = time.Now().UnixMilli()
				c.JSON(http.StatusOK, m)
				panic(err)
			}
		}()
		c.Next()
	}
}

func CheckError(err error) {
	if err != nil {
		panic(err)
	}
}

type ExceptionModel struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

func NewException(message string) ExceptionModel {
	return ExceptionModel{Message: message}
}
