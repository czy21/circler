package k8s

import (
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/entity/dto"
	"github.com/czyhome/circler/src/entity/result"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"strings"
)

func VolumeList(c *gin.Context) {
	search := dto.K8sSearchModel{}
	err := c.Bind(&search)
	if err != nil {
		panic(err)
	}
	pvs, _ := config.K8sClient.CoreV1().PersistentVolumeClaims(config.Namespace).List(context.TODO(), metav1.ListOptions{})
	items := make([]v1.PersistentVolumeClaim, 0)
	itemQuery := linq.From(pvs.Items)
	if search.Search != "" {
		itemQuery = itemQuery.
			WhereT(func(t v1.PersistentVolumeClaim) bool {
				return strings.Contains(t.Name, search.Search)
			})
	}
	itemQuery.ToSlice(&items)
	data := make(map[string]interface{})
	data["items"] = items
	data["metadata"] = pvs.ListMeta
	result.Result{c}.
		Data(data).
		Build()
}

func VolumeDetail(c *gin.Context) {
	input := dto.K8sInputModel{}
	err := c.Bind(&input)
	if err != nil {
		panic(err)
	}
	pv, _ := config.K8sClient.CoreV1().PersistentVolumeClaims(config.Namespace).Get(context.TODO(), input.Name, metav1.GetOptions{})
	result.Result{c}.
		Data(pv).
		Build()
}
