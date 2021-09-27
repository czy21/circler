package config

import (
	"context"
	"flag"
	"github.com/bndr/gojenkins"
	"io/fs"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"os"
	"path/filepath"
)

var K8sClient *kubernetes.Clientset
var Namespace = "default"
var GlobalContext *context.Context
var JenkinsClient *gojenkins.Jenkins
var Workspace, _ = os.Getwd()
var DataDir = filepath.Join(Workspace, "data")
var ClusterDir = filepath.Join(DataDir, "cluster")

func init() {
	var kubeconfig *string
	err := os.MkdirAll(ClusterDir, fs.ModeDir)
	if err != nil {
		return
	}
	if os.Getenv("target_env") == "dev" {
		pwd, _ := os.Getwd()
		kubeconfig = flag.String("kubeconfig", filepath.Join(pwd, "src/config/___temp/.kube", "config"), "(optional) absolute path to the kubeconfig file")
		flag.Parse()
		config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
		if err != nil {
			panic(err.Error())
		}
		clientside, _ := kubernetes.NewForConfig(config)
		K8sClient = clientside
	}
	GlobalContext := context.Background()
	jenkins, _ := gojenkins.CreateJenkins(nil, "http://192.168.2.21:8082/", "admin", "Czy20210314.").Init(GlobalContext)
	JenkinsClient = jenkins
}
