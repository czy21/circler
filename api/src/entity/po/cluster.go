package po

type Cluster struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ConfigPath  string `json:"configPath"`
}
