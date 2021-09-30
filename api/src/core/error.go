package core

import (
	"github.com/czyhome/circler/src/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

func ErrorHandle() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				response := entity.Response{}
				switch err.(type) {
				case ExceptionModel:
					response.Error(err).Build()
					c.JSON(http.StatusOK, response)
					break
				}
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
	panic(ExceptionModel{Message: message})
}
