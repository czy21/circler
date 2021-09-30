package entity

type BaseModel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type BaseQuery struct {
	Search string `json:"search"`
}
