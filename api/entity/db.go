package entity

import "github.com/ahmetb/go-linq/v3"

type DbInstance struct {
}

func (DbInstance) MapToPO(dto DbInstanceMetaDTO) DbInstanceMetaPO {
	return DbInstanceMetaPO{
		BaseEntity:  dto.BaseEntity,
		Name:        dto.Name,
		Host:        dto.Host,
		Port:        dto.Port,
		Kind:        dto.Kind,
		UserName:    dto.UserName,
		Password:    dto.Password,
		Description: dto.Description,
	}
}

func (s DbInstance) MapToPOS(dtos []DbInstanceMetaDTO) []DbInstanceMetaPO {
	var rets []DbInstanceMetaPO
	linq.From(dtos).SelectT(func(t DbInstanceMetaDTO) DbInstanceMetaPO {
		return s.MapToPO(t)
	}).ToSlice(rets)
	return rets
}

type DbInstanceMetaPO struct {
	BaseEntity
	Name        string `gorm:"column:name" json:"name"`
	Host        string `gorm:"column:host" json:"host"`
	Port        string `gorm:"column:port" json:"port"`
	Kind        string `gorm:"column:kind" json:"kind" option:"dbKind"`
	UserName    string `gorm:"column:username" json:"username"`
	Password    string `gorm:"column:password" json:"password"`
	Description string `gorm:"column:description" json:"description"`
}

func (DbInstanceMetaPO) TableName() string {
	return "db_instance"
}

var DbInstanceKind = map[string]interface{}{
	"MYSQL":      "MYSQL",
	"PostgreSQL": "PostgreSQL",
}

type DbInstanceMetaDTO struct {
	BaseEntity
	Name        string      `json:"name"`
	Host        string      `json:"host"`
	Port        string      `json:"port"`
	Kind        string      `json:"kind"`
	UserName    string      `json:"username"`
	Password    string      `json:"password"`
	Description string      `json:"description"`
	Dbs         []DbMetaDTO `json:"dbs"`
}

type DbMetaDTO struct {
	Name   string           `json:"name"`
	Tables []DbTableMetaDTO `json:"tables"`
}

type DbTableMetaDTO struct {
	Name   string `gorm:"column:TABLE_NAME" json:"name"`
	DbName string `gorm:"column:TABLE_SCHEMA" json:"dbName"`
}

type DbInstanceMetaQuery struct {
	BaseQuery
}
