package entity

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type Response struct {
	Context *gin.Context
	error   interface{}
	data    interface{}
}

func (r Response) Data(val interface{}) Response {
	r.data = val
	return r
}

func (r Response) Error(val interface{}) Response {
	r.error = val
	return r
}

func (r Response) Build() {
	m := make(map[string]interface{})
	m["data"] = r.data
	m["error"] = r.error
	m["timestamp"] = time.Now().UnixMilli()
	r.Context.JSON(http.StatusOK, m)
}
