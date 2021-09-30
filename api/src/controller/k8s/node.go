package k8s

import (
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func NodeList(c *gin.Context) {
	nodes, _ := config.K8sClient.CoreV1().Nodes().List(context.TODO(), metav1.ListOptions{})
	entity.Response{Context: c}.
		Data(nodes).
		Build()
}
