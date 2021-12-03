package entity

type Tabler interface {
	TableName() string
}

type BaseModel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type BaseEntity struct {
	Id           int64     `gorm:"column:id" json:"id"`
	CreatedDate  *UnixTime `gorm:"column:created_date" json:"createdDate"`
	CreatedUser  string    `gorm:"column:created_user" json:"createdUser"`
	ModifiedDate *UnixTime `gorm:"column:modified_date" json:"modifiedDate"`
	ModifiedUser string    `gorm:"column:modified_user" json:"modifiedUser"`
}

type PageModel struct {
	PageCurrent int `json:"pageCurrent"`
	PageSize    int `json:"pageSize"`
	Total       int `json:"total"`
}

type BaseQuery struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	PageModel
}
