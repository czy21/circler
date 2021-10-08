package service

import (
	"encoding/json"
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/src/core"
	"github.com/czyhome/circler/src/entity"
	"github.com/czyhome/circler/src/util"
	"io/fs"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

var ClusterMetaFileName = "meta.json"
var ClusterMetaConfigName = "config.yaml"
var ClusterDir = filepath.Join(Workspace, "data", "cluster")

func GetClusterList(query entity.ClusterQuery) ([]entity.ClusterModel, int) {
	var configs []entity.ClusterModel
	if util.PathIsNotExist(ClusterDir) {
		err := os.MkdirAll(ClusterDir, fs.ModePerm)
		core.CheckError(err)
	}

	files, err := ioutil.ReadDir(ClusterDir)
	core.CheckError(err)
	for _, f := range files {
		func(fileInfo os.FileInfo) {
			p := filepath.Join(ClusterDir, f.Name())
			jsonFile, err := os.Open(filepath.Join(p, ClusterMetaFileName))
			core.CheckError(err)
			defer func(jsonFile *os.File) {
				err := jsonFile.Close()
				core.CheckError(err)
			}(jsonFile)

			byteValue, _ := ioutil.ReadAll(jsonFile)

			var c entity.ClusterModel
			err = json.Unmarshal(byteValue, &c)
			core.CheckError(err)
			c.ConfigPath = filepath.Join(p, c.ConfigPath)
			configs = append(configs, c)
		}(f)
	}
	q := linq.From(configs)
	if query.Name != "" {
		q = q.WhereT(func(t entity.ClusterModel) bool {
			return strings.Contains(t.Name, query.Name)
		})
	}
	q.ToSlice(&configs)
	return configs, len(files)
}

func CreateCluster(input entity.ClusterModel) {
	var envPath = filepath.Join(ClusterDir, input.Name)
	var metaPath = filepath.Join(envPath, ClusterMetaFileName)
	var configPath = filepath.Join(envPath, ClusterMetaConfigName)
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
