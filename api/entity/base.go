package entity

import "time"

type BaseModel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type BaseEntity struct {
	Id           int64      `json:"id"`
	CreatedDate  *time.Time `json:"createdDate"`
	CreatedUser  *string    `json:"createdUser"`
	ModifiedDate *time.Time `json:"modifiedDate"`
	ModifiedUser *string    `json:"modifiedUser"`
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
