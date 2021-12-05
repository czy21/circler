package core

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type UnixTime time.Time

func (t UnixTime) MarshalJSON() ([]byte, error) {
	return []byte(fmt.Sprintf("%d", time.Time(t).UnixMilli())), nil
}

type Response struct {
	Context   *gin.Context              `json:"-"`
	Data      interface{}               `json:"data"`
	Page      *PageModel                `json:"page,omitempty"`
	Error     *interface{}              `json:"error,omitempty"`
	Option    *map[string][]interface{} `json:"option"`
	Timestamp UnixTime                  `json:"timestamp"`
}

func (r Response) Build() {
	r.Timestamp = UnixTime(time.Now())
	r.Context.JSON(http.StatusOK, r)
}

type PageModel struct {
	PageCurrent int `json:"pageCurrent"`
	PageSize    int `json:"pageSize"`
	Total       int `json:"total"`
}
