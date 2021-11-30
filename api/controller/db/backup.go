package db

import (
	entity "github.com/czyhome/circler/entity"
	"github.com/gin-gonic/gin"
)

func CreateBackup(c *gin.Context) {

	//cmd := "mysqldump --default-character-set=utf8mb4 --host=192.168.2.18 --port=3306 --user=admin --password=Czy.190815 --opt erp_local >  C:/Users/zhaoyu.chen/Desktop/erp-mysql.sql"
	//go func() {
	//	out, err := exec.Command("sh", "-c", cmd).CombinedOutput()
	//	if err != nil {
	//		fmt.Printf("Failed to execute command: %s", cmd)
	//	}
	//	fmt.Println(string(out))
	//
	//}()
	entity.Response{Context: c}.Data("").
		Build()
}
