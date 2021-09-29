package service

import (
	"encoding/json"
	"github.com/czyhome/circler/src/entity/po"
	"github.com/czyhome/circler/src/util/path"
	"io/ioutil"
	"os"
	"path/filepath"
)

var MetaName = "meta.json"
var ConfigName = "config.yaml"

func GetClusterList(root string) []po.Cluster {
	var configs []po.Cluster
	if path.IsNotExist(root) {
		return configs
	}

	files, err := ioutil.ReadDir(root)
	if err != nil {
		panic(err)
	}
	for _, f := range files {
		func(fileInfo os.FileInfo) {
			p := filepath.Join(root, f.Name())
			jsonFile, err := os.Open(filepath.Join(p, MetaName))
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
