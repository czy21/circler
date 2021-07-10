package k8s

import (
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/entity/result"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func ConfigMapList(c *gin.Context) {
	configmaps, _ := config.K8sClient.CoreV1().ConfigMaps(config.Namespace).List(context.TODO(), metav1.ListOptions{})
	result.Result{c}.
		Data(configmaps).
		Build()
}

func ConfigMapDetail(c *gin.Context) {
	err := c.Bind(&input)
	if err != nil {
		panic(err)
	}
	configmap, _ := config.K8sClient.CoreV1().ConfigMaps(config.Namespace).Get(context.TODO(), input.Name, metav1.GetOptions{})
	result.Result{c}.
		Data(configmap).
		Build()
}