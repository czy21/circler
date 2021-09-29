package k8s

import (
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/core"
	"github.com/czyhome/circler/src/entity/dto"
	"github.com/czyhome/circler/src/entity/po"
	"github.com/czyhome/circler/src/entity/result"
	"github.com/czyhome/circler/src/service"
	"github.com/gin-gonic/gin"
	"strings"
)

type ClusterInputModel struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ConfigPath  string `json:"configPath"`
	Content     string `json:"content"`
}

type ClusterSearchModel struct {
	dto.SearchModel
}

func ClusterList(c *gin.Context) {
	search := ClusterSearchModel{}
	err := c.Bind(&search)
	core.CheckError(err)
	list := service.GetClusterList(config.ClusterDir)
	result.Result{Context: c}.
		Data(list).
		Build()
}

func ClusterCreate(c *gin.Context) {
	input := ClusterInputModel{}
	err := c.Bind(&input)
	core.CheckError(err)
	var clusterConfigs = service.GetClusterList(config.ClusterDir)
	var existCluster = linq.From(clusterConfigs).
		WhereT(func(u po.Cluster) bool {
			return u.Name == input.Name
		}).First()
	if existCluster != nil {
		panic(core.NewException(strings.Join([]string{input.Name, "exists"}, " ")))
	}
	service.CreateCluster(input)
	result.Result{Context: c}.
		Data("success").
		Build()
}
