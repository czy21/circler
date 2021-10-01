package config

import (
	"context"
	"github.com/bndr/gojenkins"
	"k8s.io/client-go/kubernetes"
)

var K8sClient *kubernetes.Clientset
var Namespace = "default"
var GlobalContext *context.Context
var JenkinsClient *gojenkins.Jenkins

func init() {
	//var kubeconfig *string

	//pwd, _ := os.Getwd()
	//kubeconfig = flag.String("kubeconfig", filepath.Join(pwd, "src/config/___temp/.kube", "config"), "(optional) absolute path to the kubeconfig file")
	//flag.Parse()
	//println(kubeconfig)
	//
	//var configs = service.GetClusterList(ClusterDir)
	//println(configs)
	//config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	//if err != nil {
	//	panic(err.Error())
	//}
	//clientside, _ := kubernetes.NewForConfig(config)
	//K8sClient = clientside
	//}
	GlobalContext := context.Background()
	jenkins, _ := gojenkins.CreateJenkins(nil, "http://192.168.2.21:8082/", "admin", "Czy20210314.").Init(GlobalContext)
	JenkinsClient = jenkins
}
