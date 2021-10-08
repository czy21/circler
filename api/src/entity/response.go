package entity

import (
	"github.com/ahmetb/go-linq/v3"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type Response struct {
	Context   *gin.Context
	error     interface{}
	page      PageModel
	data      interface{}
	extension map[string]interface{}
}

func (r Response) Data(val interface{}) Response {
	r.data = val
	return r
}

func (r Response) Page(val PageModel) Response {
	r.page = val
	return r
}

func (r Response) Error(val interface{}) Response {
	r.error = val
	return r
}

func (r Response) Extension(val map[string]interface{}) Response {
	r.extension = val
	return r
}

func (r Response) Build() {
	m := make(map[string]interface{})
	m["data"] = r.data
	m["error"] = r.error
	m["timestamp"] = time.Now().UnixMilli()
	m["page"] = r.page
	linq.From(r.extension).
		ForEachT(func(t linq.KeyValue) {
			m[t.Key.(string)] = t.Value
		})
	r.Context.JSON(http.StatusOK, m)
}
