package service

import (
	"encoding/json"
	"github.com/czyhome/circler/src/config"
	"github.com/czyhome/circler/src/core"
	"github.com/czyhome/circler/src/entity"
	"github.com/czyhome/circler/src/util"
	"io/fs"
	"io/ioutil"
	"os"
	"path/filepath"
)

var MetaName = "meta.json"
var ConfigName = "config.yaml"

func GetClusterList(root string) []entity.ClusterModel {
	var configs []entity.ClusterModel
	if util.PathIsNotExist(root) {
		err := os.MkdirAll(root, fs.ModePerm)
		core.CheckError(err)
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

			var c entity.ClusterModel
			err = json.Unmarshal(byteValue, &c)
			core.CheckError(err)
			configs = append(configs, c)
		}(f)
	}
	return configs
}

func CreateCluster(input entity.ClusterModel) {
	var envPath = filepath.Join(config.ClusterDir, input.Name)
	var metaPath = filepath.Join(envPath, MetaName)
	var configPath = filepath.Join(envPath, ConfigName)
	err := os.MkdirAll(envPath, os.ModePerm)
	err = ioutil.WriteFile(configPath, []byte(input.Content), fs.ModePerm)
	core.CheckError(err)
	input.ConfigPath = filepath.Base(configPath)
	input.Content = ""
	metaBytes, err := json.Marshal(input)
	core.CheckError(err)
	err = ioutil.WriteFile(metaPath, metaBytes, fs.ModePerm)
	core.CheckError(err)
}
