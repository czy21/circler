package repository

import (
	"czy-erp.com/src/entity/po"
	"github.com/go-xorm/xorm"
)

type Department struct {
	dbContext *xorm.Engine
}

func (r *Department) SelectAll() *[]po.Department {
	var depts []po.Department

	return &depts
}
