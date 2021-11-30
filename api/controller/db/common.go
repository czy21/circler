package db

import (
	"github.com/czyhome/circler/core"
	entity "github.com/czyhome/circler/entity"
	"github.com/czyhome/circler/service"
	"github.com/gin-gonic/gin"
)

func ListMeta(c *gin.Context) {
	query := entity.DbMetaInput{}
	err := c.Bind(&query)
	core.CheckError(err)
	list := service.GetDbList(query)
	entity.Response{Context: c}.
		Data(list).
		Build()
}
