package entity

type DbInstanceMetaPO struct {
	BaseEntity
	Host        string `gorm:"column:host" json:"host"`
	Port        string `gorm:"column:port" json:"port"`
	Kind        string `gorm:"column:kind" json:"kind"`
	UserName    string `gorm:"column:username" json:"username"`
	Password    string `gorm:"column:password" json:"password"`
	Description string `gorm:"column:description" json:"description"`
}

func (DbInstanceMetaPO) TableName() string {
	return "db_instance"
}

type DbInstanceMetaDTO struct {
	Host        string      `json:"host"`
	Port        string      `json:"port"`
	UserName    string      `json:"username"`
	Password    string      `json:"password"`
	Kind        string      `json:"kind"`
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
