package repository

import (
	"database/sql"
	"fmt"
	"github.com/czyhome/circler/core"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var dbConnect *sql.DB
var dbClient *gorm.DB

func init() {
	var err error
	dbConnect, err = sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/circler?charset=utf8mb4&parseTime=True", "admin", "Czy.190815", "192.168.2.18", "3306"))
	dbConnect.SetMaxIdleConns(5)
	dbConnect.SetMaxOpenConns(10)
	core.CheckError(err)
	dbClient, err = gorm.Open(mysql.New(mysql.Config{
		Conn: dbConnect,
	}), &gorm.Config{})
}
