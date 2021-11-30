package controller

import (
	"github.com/czyhome/circler/controller/basic"
	"github.com/czyhome/circler/controller/db"
	k8s2 "github.com/czyhome/circler/controller/k8s"
	"github.com/gin-gonic/gin"
)

func Init(r *gin.Engine) {
	k8sRouter := r.Group("k8s")
	{
		// pod
		k8sRouter.POST("pod/search", k8s2.PodList)
		// volume
		k8sRouter.POST("volume/search", k8s2.VolumeList)
		k8sRouter.POST("volume/detail", k8s2.VolumeDetail)
		k8sRouter.POST("volume/create", k8s2.VolumeCreate)
		k8sRouter.POST("volume/editYaml", k8s2.VolumeEditYaml)
		// node
		k8sRouter.POST("node/search", k8s2.NodeList)
		// service
		k8sRouter.POST("service/search", k8s2.ServiceList)
		// configmap
		k8sRouter.POST("configmap/search", k8s2.ConfigMapList)
		k8sRouter.POST("configmap/detail", k8s2.ConfigMapDetail)
		// cluster
		k8sRouter.POST("cluster/search", k8s2.ClusterSearch)
		k8sRouter.POST("cluster/create", k8s2.ClusterCreate)
	}
	basicRouter := r.Group("basic")
	{
		basicRouter.POST("test1", basic.Test1)
		basicRouter.POST("test2", basic.Test2)
	}

	dbRouter := r.Group("db")
	{
		dbRouter.POST("listMeta", db.ListMeta)
		dbRouter.POST("createBackup", db.CreateBackup)
	}

}
