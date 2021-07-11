package dto

type InputModel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type SearchModel struct {
	Search string `json:"search"`
}
