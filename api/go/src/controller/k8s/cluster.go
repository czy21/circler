package k8s

import (
	"encoding/json"
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/entity/dto"
	"github.com/czyhome/circler/src/entity/po"
	"github.com/czyhome/circler/src/entity/result"
	"github.com/czyhome/circler/src/service"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"os"
	"path/filepath"
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
	//search := searchModel{}
	//err := c.Bind(&search)
	//if err != nil {
	//	panic(err)
	//}
	//pvs, _ := config.K8sClient.CoreV1().PersistentVolumeClaims(config.Namespace).List(context.TODO(), metav1.ListOptions{})
	//items := make([]v1.PersistentVolumeClaim, 0)
	//itemQuery := linq.From(pvs.Items)
	//if search.Search != "" {
	//	itemQuery = itemQuery.
	//		WhereT(func(t v1.PersistentVolumeClaim) bool {
	//			return strings.Contains(t.Name, search.Search)
	//		})
	//}
	//itemQuery.ToSlice(&items)
	//data := make(map[string]interface{})
	//data["items"] = items
	//data["metadata"] = pvs.ListMeta
	//result.Result{Context: c}.
	//	Data().
	//	Build()
}

func ClusterCreate(c *gin.Context) {
	input := ClusterInputModel{}
	err := c.Bind(&input)
	if err != nil {
		panic(err)
	}
	var clusterConfigs = service.GetClusterList(config.ClusterDir)
	var existCluster = linq.From(clusterConfigs).
		WhereT(func(u po.Cluster) bool {
			return u.Name == input.Name
		}).First()
	println(existCluster)
	var envPath = filepath.Join(config.ClusterDir, input.Name)
	var metaPath = filepath.Join(envPath, "meta.json")
	var configPath = filepath.Join(envPath, "config.yaml")
	err = os.MkdirAll(envPath, os.ModePerm)
	if err != nil {
		panic(err)
	}
	input.ConfigPath = filepath.Base(configPath)
	input.Content = ""
	metaBytes, err := json.Marshal(input)
	if err != nil {
		panic(err)
	}
	err = ioutil.WriteFile(metaPath, metaBytes, 0666)
	err = ioutil.WriteFile(configPath, []byte(input.Content), 0666)
	if err != nil {
		panic(err)
	}
	result.Result{Context: c}.
		Data("success").
		Build()
}
