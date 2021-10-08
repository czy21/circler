package k8s

import (
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"strings"
)

func ConfigMapList(c *gin.Context) {
	search := entity.BaseQuery{}
	err := c.Bind(&search)
	if err != nil {
		panic(err)
	}
	client:=config.K8sClientMap["dev"]
	configmaps, _ := client.CoreV1().ConfigMaps(config.Namespace).List(context.TODO(), metav1.ListOptions{})
	items := make([]v1.ConfigMap, 0)
	itemQuery := linq.From(configmaps.Items)
	if search.Name != "" {
		itemQuery = itemQuery.
			WhereT(func(t v1.ConfigMap) bool {
				return strings.Contains(t.Name, search.Name)
			})
	}
	itemQuery.ToSlice(&items)
	data := make(map[string]interface{})
	data["items"] = items
	data["metadata"] = configmaps.ListMeta
	entity.Response{Context: c}.
		Data(data).
		Build()
}

func ConfigMapDetail(c *gin.Context) {
	input := entity.BaseModel{}
	err := c.Bind(&input)
	if err != nil {
		panic(err)
	}
	client:=config.K8sClientMap["dev"]
	configmap, _ := client.CoreV1().ConfigMaps(config.Namespace).Get(context.TODO(), input.Name, metav1.GetOptions{})
	entity.Response{Context: c}.
		Data(configmap).
		Build()
}