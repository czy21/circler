package entity

type BaseModel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
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
