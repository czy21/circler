package config

import (
	"flag"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"os"
	"path/filepath"
)

var K8sClient *kubernetes.Clientset

func init() {
	var kubeconfig *string
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

}
