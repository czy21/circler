package basic

import (
	"fmt"
	"github.com/czyhome/circler/config"
	entity2 "github.com/czyhome/circler/entity"
	"github.com/gin-gonic/gin"
	"time"
)

type inputModel struct {
	entity2.BaseModel
	Capacity   int64  `json:"capacity"`
	AccessMode string `json:"accessMode"`
	Yaml       string `json:"yaml"`
}

type searchModel struct {
	entity2.BaseQuery
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
	km := config.K8sClientMap
	fmt.Println(km)
	entity2.Response{Context: c}.
		Data(km).
		Build()
}

func Test2(c *gin.Context) {
	km := config.K8sClientMap
	entity2.Response{Context: c}.
		Data(km).
		Build()
}
