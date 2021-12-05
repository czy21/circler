package entity

import "github.com/czyhome/circler/core"

type Tabler interface {
	TableName() string
}

type BaseModel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type BaseEntity struct {
	Id           int64          `gorm:"column:id" json:"id"`
	CreatedDate  *core.UnixTime `gorm:"column:created_date" json:"createdDate"`
	CreatedUser  string         `gorm:"column:created_user" json:"createdUser"`
	ModifiedDate *core.UnixTime `gorm:"column:modified_date" json:"modifiedDate"`
	ModifiedUser string         `gorm:"column:modified_user" json:"modifiedUser"`
}

type BaseQuery struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	core.PageModel
}

type SimpleItemModel struct {
	Label    string            `json:"label"`
	Value    interface{}       `json:"value"`
	Extra    interface{}       `json:"extra,omitempty"`
	Children []SimpleItemModel `json:"children,omitempty"`
}
