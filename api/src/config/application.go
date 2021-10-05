package config

import (
	"context"
	"flag"
	"github.com/bndr/gojenkins"
	"github.com/czyhome/circler/src/core"
	"github.com/czyhome/circler/src/entity"
	"github.com/czyhome/circler/src/service"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)
var Namespace = "default"
var GlobalContext *context.Context
var JenkinsClient *gojenkins.Jenkins
var K8sClientMap = make(map[string]kubernetes.Clientset)

func init() {

	c := service.GetClusterList(entity.ClusterQuery{})
	for _, t := range c {
		kubeConfig := flag.String("kubeconfig", t.ConfigPath, "(optional) absolute path to the kubeconfig file")
		flag.Parse()
		config, err := clientcmd.BuildConfigFromFlags("", *kubeConfig)
		core.CheckError(err)
		client, _ := kubernetes.NewForConfig(config)
		K8sClientMap[t.Name] = *client
	}

	GlobalContext := context.Background()
	jenkins, _ := gojenkins.CreateJenkins(nil, "http://192.168.2.25:8082/", "admin", "Czy20210314.").Init(GlobalContext)
	JenkinsClient = jenkins

}
