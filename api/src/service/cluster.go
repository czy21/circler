package service

import (
	"encoding/json"
	"github.com/czyhome/circler/src/core"
	"github.com/czyhome/circler/src/entity/po"
	"github.com/czyhome/circler/src/util/path"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

var MetaName = "meta.json"
var ConfigName = "config.yaml"

func GetClusterList(root string) []po.Cluster {
	var configs []po.Cluster
	if path.IsNotExist(root) {
		panic(strings.Join([]string{root, " not exists"}, " "))
	}

	files, err := ioutil.ReadDir(root)
	core.CheckError(err)
	for _, f := range files {
		func(fileInfo os.FileInfo) {
			p := filepath.Join(root, f.Name())
			jsonFile, err := os.Open(filepath.Join(p, MetaName))
			core.CheckError(err)
			defer func(jsonFile *os.File) {
				err := jsonFile.Close()
				core.CheckError(err)
			}(jsonFile)

			byteValue, _ := ioutil.ReadAll(jsonFile)

			var c po.Cluster
			err = json.Unmarshal(byteValue, &c)
			core.CheckError(err)
			configs = append(configs, c)
		}(f)
	}
	return configs
}
