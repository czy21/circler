package k8s

import (
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/core"
	entity2 "github.com/czyhome/circler/entity"
	"github.com/czyhome/circler/service"
	"github.com/gin-gonic/gin"
	"strings"
)

func ClusterSearch(c *gin.Context) {
	query := entity2.ClusterQuery{}
	err := c.Bind(&query)
	core.CheckError(err)
	list, count := service.GetClusterList(query)
	entity2.Response{Context: c}.
		Data(list).
		Page(entity2.PageModel{PageCurrent: query.PageCurrent, PageSize: query.PageSize, Total: count}).
		Build()
}

func ClusterCreate(c *gin.Context) {
	input := struct {
		Query entity2.ClusterQuery
		Form  entity2.ClusterModel
	}{}
	err := c.Bind(&input)
	core.CheckError(err)
	if input.Form.Name == "" {
		panic(core.NewException(strings.Join([]string{"name must be not empty"}, " ")))
	}

	exists, _ := service.GetClusterList(entity2.ClusterQuery{BaseQuery: entity2.BaseQuery{Name: input.Form.Name}})

	if e := linq.From(exists).
		AnyWithT(func(u entity2.ClusterModel) bool {
			return u.Name == input.Form.Name
		}); e {
		panic(core.NewException(strings.Join([]string{input.Form.Name, "exists"}, " ")))
	}
	service.CreateCluster(input.Form)
	list, count := service.GetClusterList(input.Query)
	entity2.Response{Context: c}.Data(list).
		Page(entity2.PageModel{PageCurrent: input.Query.PageCurrent, PageSize: input.Query.PageSize, Total: count}).
		Build()
}
