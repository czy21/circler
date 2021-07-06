package controller

import (
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/entity/result"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

var namespace = "default"

func PodList(c *gin.Context) {
	pods, _ := config.K8sClient.CoreV1().Pods(namespace).List(context.TODO(), metav1.ListOptions{})
	result.Result{c}.
		Data(pods).
		Build()
}

func VolumeList(c *gin.Context) {
	pvs, _ := config.K8sClient.CoreV1().PersistentVolumeClaims(namespace).List(context.TODO(), metav1.ListOptions{})
	result.Result{c}.
		Data(pvs).
		Build()
}

func VolumeDetail(c *gin.Context) {
	pv, _ := config.K8sClient.CoreV1().PersistentVolumeClaims(namespace).Get(context.TODO(), "data-mysql-0", metav1.GetOptions{})
	result.Result{c}.
		Data(pv).
		Build()
}

func NodeList(c *gin.Context) {
	nodes, _ := config.K8sClient.CoreV1().Nodes().List(context.TODO(), metav1.ListOptions{})
	result.Result{c}.
		Data(nodes).
		Build()
}

func ServiceList(c *gin.Context) {
	services, _ := config.K8sClient.CoreV1().Services(namespace).List(context.TODO(), metav1.ListOptions{})
	result.Result{c}.
		Data(services).
		Build()
}

func ConfigMapList(c *gin.Context) {
	configmaps, _ := config.K8sClient.CoreV1().ConfigMaps(namespace).List(context.TODO(), metav1.ListOptions{})
	result.Result{c}.
		Data(configmaps).
		Build()
}

func InitK8sRouter(r *gin.Engine) {
	uRouter := r.Group("k8s")
	{
		// pod
		uRouter.POST("pod/list", PodList)
		// volume
		uRouter.POST("volume/list", VolumeList)
		uRouter.POST("volume/detail", VolumeDetail)
		// node
		uRouter.POST("node/list", NodeList)
		// service
		uRouter.POST("service/list", ServiceList)
		// configmap
		uRouter.POST("configmap/list", ConfigMapList)
	}
}
