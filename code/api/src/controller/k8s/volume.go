package k8s

import (
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/entity/dto"
	"github.com/czyhome/circler/src/entity/result"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

var input dto.K8sInputModel

func VolumeList(c *gin.Context) {
	pvs, _ := config.K8sClient.CoreV1().PersistentVolumeClaims(config.Namespace).List(context.TODO(), metav1.ListOptions{})
	result.Result{c}.
		Data(pvs).
		Build()
}

func VolumeDetail(c *gin.Context) {
	err := c.Bind(&input)
	if err != nil {
		panic(err)
	}
	pv, _ := config.K8sClient.CoreV1().PersistentVolumeClaims(config.Namespace).Get(context.TODO(), input.Name, metav1.GetOptions{})
	result.Result{c}.
		Data(pv).
		Build()
}