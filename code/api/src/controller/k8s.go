package controller

import (
	"github.com/czyhome/circler/src/config"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
)

func PodList(c *gin.Context) {
	pods, err := config.K8sClient.CoreV1().Pods("").List(context.TODO(),)

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
