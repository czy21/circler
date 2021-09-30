package basic

import (
	"fmt"
	"github.com/czyhome/circler/src/entity"
	"github.com/gin-gonic/gin"
	"time"
)

type inputModel struct {
	entity.BaseModel
	Capacity   int64  `json:"capacity"`
	AccessMode string `json:"accessMode"`
	Yaml       string `json:"yaml"`
}

type searchModel struct {
	entity.BaseQuery
}
func say(s string) {
	for i := 0; i < 3; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}
func Test1(c *gin.Context) {
	go say("hello world")
	//time.Sleep(1000 * time.Millisecond)
	fmt.Println("over!")
	entity.Response{Context: c}.
		Data("").
		Build()
}
