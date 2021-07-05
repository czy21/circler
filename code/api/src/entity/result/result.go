package result

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type Result struct {
	Context *gin.Context
}

var ret = make(map[string]interface{})

func (r Result) Data(data interface{}) Result {
	ret["data"] = data
	return r
}

func (r Result) Token(token interface{}) Result {
	ret["token"] = token
	return r
}

func (r Result) Build() {
	r.Context.JSON(http.StatusOK, ret)
}
