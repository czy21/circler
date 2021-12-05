package core

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

	"time"
)

func ResponseHandler() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Next()
	}
}

func DateValidator(fl validator.FieldLevel) bool {
	date, ok := fl.Field().Interface().(time.Time)
	fmt.Println(date, ok)
	return true
}
