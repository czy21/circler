package result

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type Result struct {
	Context *gin.Context
}

var ret interface{}

func (r Result) Data(data interface{}) Result {
	ret = data
	return r
}

func (r Result) Build() {
	r.Context.JSON(http.StatusOK, ret)
}
