package controller

import (
	"context"
	"github.com/bndr/gojenkins"
	"github.com/czyhome/circler/src/entity/result"
	"github.com/gin-gonic/gin"
)

func JobList(c *gin.Context) {
	ctx := context.Background()
	jenkins, _ := gojenkins.CreateJenkins(nil, "http://192.168.2.21:8082/", "admin", "Czy20210314.").Init(ctx)

	jobs, err := jenkins.GetAllJobs(ctx)
	if err != nil {
		panic(err)
	}
	jobNames := make(map[string]string, len(jobs))
	for _, job := range jobs {
		jobNames["jobName"] = job.GetName()
	}
	result.Result{c}.
		Data(jobNames).
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
	uRouter := r.Group("job")
	{
		uRouter.GET("list", JobList)
		//uRouter.POST("search", UserSearch)
	}

}
