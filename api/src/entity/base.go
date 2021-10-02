package entity

type BaseModel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type BaseQuery struct {
	Name        string `json:"name"`
	PageCurrent int    `json:"pageCurrent"`
	PageSize    int    `json:"pageSize"`
	Total       int    `json:"total"`
}
