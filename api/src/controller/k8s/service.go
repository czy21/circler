package k8s

import (
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func ServiceList(c *gin.Context) {
	services, _ := config.K8sClient.CoreV1().Services(config.Namespace).List(context.TODO(), metav1.ListOptions{})
	entity.Response{Context: c}.
		Data(services).
		Build()
}