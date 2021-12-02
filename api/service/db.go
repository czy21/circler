package service

import (
	"database/sql"
	"fmt"
	"github.com/ahmetb/go-linq/v3"
	"github.com/czyhome/circler/core"
	"github.com/czyhome/circler/entity"
	"github.com/czyhome/circler/repository"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func GetDbList(model entity.DbInstanceMetaDTO) []entity.DbMetaDTO {
	dbConnect, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/", model.UserName, model.Password, model.Host, model.Port))
	core.CheckError(err)
	dbClient, err := gorm.Open(mysql.New(mysql.Config{
		Conn: dbConnect,
	}), &gorm.Config{})
	core.CheckError(err)
	var result []entity.DbTableMetaDTO

	dbClient.Raw("select * from information_schema.tables order by TABLE_SCHEMA asc").Scan(&result)

	query := linq.From(result).GroupByT(func(t entity.DbTableMetaDTO) string {
		return t.DbName
	}, func(i entity.DbTableMetaDTO) entity.DbTableMetaDTO {
		return i
	}).OrderByT(func(g linq.Group) string {
		return g.Key.(string)
	}).SelectT(func(g linq.Group) entity.DbMetaDTO {
		var t entity.DbMetaDTO
		t.Name = g.Key.(string)
		linq.From(g.Group).OrderByT(func(i entity.DbTableMetaDTO) string {
			return i.Name
		}).SelectT(func(i interface{}) entity.DbTableMetaDTO {
			return i.(entity.DbTableMetaDTO)
		}).ToSlice(&t.Tables)
		return t
	})
	var ret []entity.DbMetaDTO
	query.ToSlice(&ret)
	return ret
}

func InstanceFindAll() []entity.DbInstanceMetaPO {
	return repository.DbInstance{}.SelectAll()
}

func InstanceAdd(dto entity.DbInstanceMetaDTO) {

}