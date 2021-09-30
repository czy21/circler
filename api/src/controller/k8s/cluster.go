package k8s

import (
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/core"
	"github.com/czyhome/circler/src/entity"
	"github.com/czyhome/circler/src/service"
	"github.com/gin-gonic/gin"
	"strings"
)

func ClusterList(c *gin.Context) {
	search := entity.ClusterQuery{}
	err := c.Bind(&search)
	core.CheckError(err)
	list := service.GetClusterList(config.ClusterDir)
	entity.Response{Context: c}.Data(list).Build()
}

func ClusterCreate(c *gin.Context) {
	input := entity.ClusterModel{}
	err := c.Bind(&input)
	core.CheckError(err)
	var clusterConfigs = service.GetClusterList(config.ClusterDir)
	var existCluster = linq.From(clusterConfigs).
		WhereT(func(u entity.ClusterModel) bool {
			return u.Name == input.Name
		}).First()
	if existCluster != nil {
		panic(core.NewException(strings.Join([]string{input.Name, "exists"}, " ")))
	}
	service.CreateCluster(input)
	entity.Response{Context: c}.Data("success").Build()
}
