package k8s

import (
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/src/core"
	"github.com/czyhome/circler/src/entity"
	"github.com/czyhome/circler/src/service"
	"github.com/gin-gonic/gin"
	"strings"
)

func ClusterList(c *gin.Context) {
	query := entity.ClusterQuery{}
	err := c.Bind(&query)
	core.CheckError(err)
	list := service.GetClusterList()
	entity.Response{Context: c}.Data(list).Build()
}

func ClusterCreate(c *gin.Context) {
	input := entity.ClusterModel{}
	err := c.Bind(&input)
	core.CheckError(err)
	if input.Name == "" {
		panic(core.NewException(strings.Join([]string{"name must be not empty"}, " ")))
	}
	configs := service.GetClusterList()

	if exists := linq.From(configs).
		AnyWithT(func(u entity.ClusterModel) bool {
			return u.Name == input.Name
		}); exists {
		panic(core.NewException(strings.Join([]string{input.Name, "exists"}, " ")))
	}
	service.CreateCluster(input)
	configs = service.GetClusterList()
	entity.Response{Context: c}.Data(configs).Build()
}
