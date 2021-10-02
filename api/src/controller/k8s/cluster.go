package k8s

import (
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/src/core"
	"github.com/czyhome/circler/src/entity"
	"github.com/czyhome/circler/src/service"
	"github.com/gin-gonic/gin"
	"strings"
)

func ClusterSearch(c *gin.Context) {
	query := entity.ClusterQuery{}
	err := c.Bind(&query)
	core.CheckError(err)
	list := service.GetClusterList(query)
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

	exists := service.GetClusterList(entity.ClusterQuery{BaseQuery: entity.BaseQuery{Name: input.Form.Name}})

	if e := linq.From(exists).
		AnyWithT(func(u entity.ClusterModel) bool {
			return u.Name == input.Form.Name
		}); e {
		panic(core.NewException(strings.Join([]string{input.Form.Name, "exists"}, " ")))
	}
	service.CreateCluster(input.Form)
	list := service.GetClusterList(input.Query)
	entity.Response{Context: c}.Data(list).Build()
}
