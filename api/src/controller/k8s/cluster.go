package k8s

import (
	"encoding/json"
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/core"
	"github.com/czyhome/circler/src/entity/dto"
	"github.com/czyhome/circler/src/entity/po"
	"github.com/czyhome/circler/src/entity/result"
	"github.com/czyhome/circler/src/service"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"os"
	"path/filepath"
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
	if err != nil {
		panic(err)
	}
	var list = service.GetClusterList(config.ClusterDir)
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
	var envPath = filepath.Join(config.ClusterDir, input.Name)
	var metaPath = filepath.Join(envPath, "meta.json")
	var configPath = filepath.Join(envPath, "config.yaml")
	err = os.MkdirAll(envPath, os.ModePerm)
	err = ioutil.WriteFile(configPath, []byte(input.Content), 0666)
	core.CheckError(err)
	input.ConfigPath = filepath.Base(configPath)
	input.Content = ""
	metaBytes, err := json.Marshal(input)
	core.CheckError(err)
	err = ioutil.WriteFile(metaPath, metaBytes, 0666)
	core.CheckError(err)
	result.Result{Context: c}.
		Data("success").
		Build()
}
