package service

import (
	"database/sql"
	"fmt"
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/core"
	"github.com/czyhome/circler/entity"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func GetDbList(model entity.DbMetaInput) []entity.DbMeta {
	dbConnect, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/", model.UserName, model.Password, model.Host, model.Port))
	core.CheckError(err)
	dbClient, err := gorm.Open(mysql.New(mysql.Config{
		Conn: dbConnect,
	}), &gorm.Config{})
	core.CheckError(err)
	var result []entity.DbTableMeta

	dbClient.Raw("select * from information_schema.tables order by TABLE_SCHEMA asc").Scan(&result)

	query := linq.From(result).GroupByT(func(t entity.DbTableMeta) string {
		return t.DbName
	}, func(i entity.DbTableMeta) entity.DbTableMeta {
		return i
	}).OrderByT(func(g linq.Group) string{
		return g.Key.(string)
	}).SelectT(func(g linq.Group) entity.DbMeta {
		var t entity.DbMeta
		t.Name = g.Key.(string)
		linq.From(g.Group).OrderByT(func(i entity.DbTableMeta) string {
			return i.Name
		}).SelectT(func(i interface{}) entity.DbTableMeta {
			return i.(entity.DbTableMeta)
		}).ToSlice(&t.Tables)
		return t
	})
	var ret []entity.DbMeta
	query.ToSlice(&ret)
	return ret
}
