package db

import (
	"github.com/czyhome/circler/core"
	entity "github.com/czyhome/circler/entity"
	"github.com/czyhome/circler/service"
	"github.com/gin-gonic/gin"
)

func ListMeta(c *gin.Context) {
	query := entity.DbInstanceMetaDTO{}
	err := c.Bind(&query)
	core.CheckError(err)
	list := service.GetDbList(query)
	entity.Response{Context: c, Data: list}.
		Build()
}

func Ping(c *gin.Context) {
	m := entity.DbInstanceMetaDTO{}
	err := c.Bind(&m)
	core.CheckError(err)
	ret := service.InstancePing(m)
	entity.Response{Context: c, Data: ret}.Build()
}

func InstanceList(c *gin.Context) {
	list := service.InstanceFindAll()
	entity.Response{Context: c, Data: list}.
		Build()
}

func InstanceAdd(c *gin.Context) {
	input := entity.DbInstanceMetaDTO{}
	err := c.Bind(&input)
	core.CheckError(err)
	service.InstanceAdd(input)
	entity.Response{Context: c, Data: map[string]interface{}{"status": "success"}}.
		Build()
}
