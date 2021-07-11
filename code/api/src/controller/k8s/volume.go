package k8s

import (
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/entity/dto"
	"github.com/czyhome/circler/src/entity/result"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	v1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"strconv"
	"strings"
)

type inputModel struct {
	dto.InputModel
	Capacity   int64  `json:"capacity"`
	AccessMode string `json:"accessMode"`
}

type searchModel struct {
	dto.SearchModel
}

func VolumeList(c *gin.Context) {
	search := searchModel{}
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
	result.Result{Context: c}.
		Data(data).
		Build()
}

func VolumeDetail(c *gin.Context) {
	input := inputModel{}
	err := c.Bind(&input)
	if err != nil {
		panic(err)
	}
	pv, _ := config.K8sClient.CoreV1().PersistentVolumeClaims(config.Namespace).Get(context.TODO(), input.Name, metav1.GetOptions{})
	result.Result{Context: c}.
		Data(pv).
		Build()
}

func VolumeCreate(c *gin.Context) {
	input := inputModel{}
	err := c.Bind(&input)
	if err != nil {
		panic(err)
	}
	storage := "managed-nfs-storage"
	pv := &v1.PersistentVolumeClaim{
		ObjectMeta: metav1.ObjectMeta{
			Name: input.Name,
		},
		Spec: v1.PersistentVolumeClaimSpec{
			AccessModes: []v1.PersistentVolumeAccessMode{v1.PersistentVolumeAccessMode(input.AccessMode)},
			Resources: v1.ResourceRequirements{
				Requests: map[v1.ResourceName]resource.Quantity{
					"storage": resource.MustParse(strconv.FormatInt(input.Capacity, 10) + "Gi"),
				},
			},
			StorageClassName: &storage,
		},
	}
	pvCreateResult, err := config.K8sClient.CoreV1().PersistentVolumeClaims(config.Namespace).Create(context.TODO(), pv, metav1.CreateOptions{})
	if err != nil {
		panic(err)
	}
	result.Result{Context: c}.
		Data(pvCreateResult).
		Build()
}
