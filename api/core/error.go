package core

import (
	"github.com/czyhome/circler/entity"
	"github.com/gin-gonic/gin"
)

func ErrorHandle() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				switch err.(type) {
				case ExceptionModel:
					entity.Response{Context: c}.Error(err).Build()
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
