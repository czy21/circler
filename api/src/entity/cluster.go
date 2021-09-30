package entity

type ClusterModel struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ConfigPath  string `json:"configPath"`
	Content     string `json:"content"`
}

type ClusterQuery struct {
	BaseQuery
}
