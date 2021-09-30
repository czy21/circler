package k8s

import (
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func PodList(c *gin.Context) {
	pods, _ := config.K8sClient.CoreV1().Pods(config.Namespace).List(context.TODO(), metav1.ListOptions{})
	entity.Response{Context: c}.
		Data(pods).
		Build()
}