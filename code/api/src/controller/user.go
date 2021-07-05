package controller

import (
	"github.com/czyhome/circler/src/entity/result"
	"github.com/gin-gonic/gin"
)

func UserLoad(c *gin.Context) {
	result.Result{c}.
		Data([]string{"ni"}).
		Build()
}

//func UserSearch(c *gin.Context) {
//	userInput := dto.User{}
//	_ = c.ShouldBind(&userInput)
//	result.Result{c}.
//		Data(service.UserService.FindAllByPage(&userInput)).
//		Build()
//}

func InitUserRouter(r *gin.Engine) {
	uRouter := r.Group("user")
	{
		uRouter.GET("load", UserLoad)
		//uRouter.POST("search", UserSearch)
	}

}
