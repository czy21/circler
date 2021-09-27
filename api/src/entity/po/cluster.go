package po

type Cluster struct {
	Key         string `json:"key"`
	Description string `json:"description"`
	ConfigPath  string `json:"configPath"`
}
