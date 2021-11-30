package entity

type DbMetaInput struct {
	Host     string   `json:"host"`
	Port     string   `json:"port"`
	UserName string   `json:"username"`
	Password string   `json:"password"`
	Kind     string   `json:"kind"`
	Dbs      []DbMeta `json:"dbs"`
}

type DbMeta struct {
	Name   string        `json:"name"`
	Tables []DbTableMeta `json:"tables"`
}

type DbTableMeta struct {
	Name   string `gorm:"column:TABLE_NAME" json:"name"`
	DbName string `gorm:"column:TABLE_SCHEMA" json:"dbName"`
}

type DbMetaQuery struct {
	BaseQuery
}
