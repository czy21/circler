package service

import (
	"encoding/json"
	"github.com/czyhome/circler/src/entity/po"
	"io/ioutil"
	"os"
	"path/filepath"
)

func GetClusterList(root string, configName string) []po.Cluster {
	var configs []po.Cluster

	files, err := ioutil.ReadDir(root)
	if err != nil {
		panic(err)
	}
	for _, f := range files {
		func(fileInfo os.FileInfo) {
			path := filepath.Join(root, f.Name())
			jsonFile, err := os.Open(filepath.Join(path, "meta.json"))
			if err != nil {
				panic(err)
			}
			defer func(jsonFile *os.File) {
				err := jsonFile.Close()
				if err != nil {
					panic(err)
				}
			}(jsonFile)

			byteValue, _ := ioutil.ReadAll(jsonFile)

			var c po.Cluster
			err = json.Unmarshal(byteValue, &c)
			if err != nil {
				panic(err)
			}
			configs = append(configs, c)
		}(f)
	}
	return configs
}
