package repository

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/xorm"
	"xorm.io/core"
	"xorm.io/xorm/names"
)

var dbContext *xorm.Engine

func GetDBContext() *xorm.Engine {
	return dbContext
}
func init() {
	engine, err := xorm.NewEngine("mysql", "root:Czy.190815@tcp(127.0.0.1:3306)/erp_local?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err.Error())
	}
	engine.SetMapper(names.GonicMapper{})
	engine.ShowSQL(true)
	engine.Logger().SetLevel(core.LOG_DEBUG)
	dbContext = engine

}


