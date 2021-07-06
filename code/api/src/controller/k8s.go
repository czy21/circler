package controller

import (
	"fmt"
	"github.com/czyhome/circler/src/config"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func PodList(c *gin.Context) {
	pods, _ := config.K8sClient.CoreV1().Pods("default").List(context.TODO(), metav1.ListOptions{})
	fmt.Println(pods)

}

func VolumeList(c *gin.Context) {

}

func NodeList(c *gin.Context) {

}

func ServiceList(c *gin.Context) {

}

func ConfigList(c *gin.Context) {

}

func InitK8sRouter(r *gin.Engine) {
	uRouter := r.Group("k8s")
	{
		uRouter.POST("pod/list", PodList)
		uRouter.POST("volume/list", VolumeList)
		uRouter.POST("node/list", NodeList)
		uRouter.POST("service/list", ServiceList)
		uRouter.POST("config/list", ConfigList)
	}
}
