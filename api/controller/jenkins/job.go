package jenkins

import (
	"fmt"
	"github.com/bndr/gojenkins"
	"github.com/czyhome/circler/config"
	"github.com/czyhome/circler/entity"
	"github.com/gin-gonic/gin"
)

func JobList(c *gin.Context) {

	jobs, err := config.JenkinsClient.GetAllJobs(*config.GlobalContext)
	if err != nil {
		panic(err)
	}
	jobNames := make(map[string]string)
	for _, job := range jobs {
		jobNames["jobName"] = job.GetName()
	}
	entity.Response{Context: c}.
		Data("").
		Build()
}

func BuildJob(c *gin.Context) {
	jenkins, _ := gojenkins.CreateJenkins(nil, "http://192.168.2.21:8082/", "admin", "Czy20210314.").Init(*config.GlobalContext)
	params := make(map[string]string)
	buildNumber, err := jenkins.BuildJob(*config.GlobalContext, "erp_dev", params)
	if err != nil {
		panic(err)
	}
	fmt.Println(buildNumber)
}

func JobDetail(c *gin.Context) {

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
