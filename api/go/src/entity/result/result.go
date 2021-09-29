package result

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type Result struct {
	Context *gin.Context
}

var data interface{}

func (r Result) Data(val interface{}) Result {
	data = val
	return r
}

func (r Result) Build() {
	var m = make(map[string]interface{})
	m["data"] = data
	m["timestamp"] = time.Now().UnixMilli()
	r.Context.JSON(http.StatusOK, m)
}
