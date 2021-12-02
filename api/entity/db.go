package entity

type DbInstanceMetaPO struct {
	BaseEntity
	Host        string `gorm:"host"`
	Port        string `gorm:"port"`
	UserName    string `gorm:"username"`
	Password    string `gorm:"password"`
	Kind        string `gorm:"kind"`
	Description string `gorm:"description"`
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
	Name   string `json:"name"`
	DbName string `json:"dbName"`
}

type DbInstanceMetaQuery struct {
	BaseQuery
}
