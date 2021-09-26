package k8s

import (
	"github.com/czyhome/circler/src/entity/dto"
	"github.com/czyhome/circler/src/entity/result"
	"github.com/gin-gonic/gin"
)

type ClusterInputModel struct {
	dto.InputModel
	Content string `json:"string"`
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
	//	Data(data).
	//	Build()
}

func ClusterCreate(c *gin.Context) {
	input := ClusterInputModel{}
	err := c.Bind(&input)
	if err != nil {
		panic(err)
	}

	result.Result{Context: c}.
		Data("").
		Build()
}
