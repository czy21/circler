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
	list := service.GetClusterList(entity.ClusterModel{})
	entity.Response{Context: c}.Data(list).Build()
}

func ClusterCreate(c *gin.Context) {
	input := struct {
		Query entity.ClusterQuery
		Form  entity.ClusterModel
	}{}
	err := c.Bind(&input)
	core.CheckError(err)
	if input.Form.Name == "" {
		panic(core.NewException(strings.Join([]string{"name must be not empty"}, " ")))
	}

	list := service.GetClusterList(entity.ClusterModel{})

	if exists := linq.From(list).
		AnyWithT(func(u entity.ClusterModel) bool {
			return u.Name == input.Form.Name
		}); exists {
		panic(core.NewException(strings.Join([]string{input.Form.Name, "exists"}, " ")))
	}
	service.CreateCluster(input.Form)
	list = service.GetClusterList(entity.ClusterModel{})
	entity.Response{Context: c}.Data(list).Build()
}
