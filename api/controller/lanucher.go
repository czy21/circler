package controller

import (
	"github.com/czyhome/circler/controller/basic"
	"github.com/czyhome/circler/controller/db"
	"github.com/czyhome/circler/controller/k8s"
	"github.com/gin-gonic/gin"
)

func InitRouter(r *gin.Engine) {
	k8sRouter := r.Group("k8s")
	{
		// pod
		k8sRouter.POST("pod/search", k8s.PodList)
		// volume
		k8sRouter.POST("volume/search", k8s.VolumeList)
		k8sRouter.POST("volume/detail", k8s.VolumeDetail)
		k8sRouter.POST("volume/create", k8s.VolumeCreate)
		k8sRouter.POST("volume/editYaml", k8s.VolumeEditYaml)
		// node
		k8sRouter.POST("node/search", k8s.NodeList)
		// service
		k8sRouter.POST("service/search", k8s.ServiceList)
		// configmap
		k8sRouter.POST("configmap/search", k8s.ConfigMapList)
		k8sRouter.POST("configmap/detail", k8s.ConfigMapDetail)
		// cluster
		k8sRouter.POST("cluster/search", k8s.ClusterSearch)
		k8sRouter.POST("cluster/create", k8s.ClusterCreate)
	}
	basicRouter := r.Group("basic")
	{
		basicRouter.POST("test1", basic.Test1)
		basicRouter.POST("test2", basic.Test2)
	}

	dbRouter := r.Group("db")
	{
		dbRouter.POST("listMeta", db.ListMeta)
		dbRouter.POST("instance/list", db.InstanceList)
		dbRouter.POST("instance/add", db.InstanceAdd)
		dbRouter.POST("createBackup", db.CreateBackup)
	}

}
