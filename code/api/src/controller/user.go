package controller

import (
	"czy-erp.com/src/entity/dto"
	"czy-erp.com/src/entity/result"
	"czy-erp.com/src/service"
	"github.com/gin-gonic/gin"
)

func UserLoad(c *gin.Context) {
	result.Result{c}.
		Data(service.UserService.FindAll()).
		Build()
}

func UserSearch(c *gin.Context) {
	userInput := dto.User{}
	_ = c.ShouldBind(&userInput)
	result.Result{c}.
		Data(service.UserService.FindAllByPage(&userInput)).
		Build()
}

func InitUserRouter(r *gin.Engine) {
	uRouter := r.Group("user")
	{
		uRouter.GET("load", UserLoad)
		uRouter.POST("search", UserSearch)
	}

}
