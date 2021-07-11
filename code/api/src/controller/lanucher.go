package controller

import (
	"github.com/czyhome/circler/src/controller/k8s"
	"github.com/gin-gonic/gin"
)

func Init(r *gin.Engine) {
	k8sRouter := r.Group("k8s")
	{
		// pod
		k8sRouter.POST("pod/list", k8s.PodList)
		// volume
		k8sRouter.POST("volume/list", k8s.VolumeList)
		k8sRouter.POST("volume/detail", k8s.VolumeDetail)
		k8sRouter.POST("volume/create", k8s.VolumeCreate)
		// node
		k8sRouter.POST("node/list", k8s.NodeList)
		// service
		k8sRouter.POST("service/list", k8s.ServiceList)
		// configmap
		k8sRouter.POST("configmap/list", k8s.ConfigMapList)
		k8sRouter.POST("configmap/detail", k8s.ConfigMapDetail)
	}
}
