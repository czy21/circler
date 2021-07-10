package dto

type K8sInputModel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type K8sSearchModel struct {
	Search string `json:"search"`
}
