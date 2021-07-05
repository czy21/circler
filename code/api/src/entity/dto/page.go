package dto

type Page struct {
	PageIndex int `json:"pageIndex,omitempty"`
	PageSize  int `json:"pageSize,omitempty"`
	Total     int `json:"total,omitempty"`
}