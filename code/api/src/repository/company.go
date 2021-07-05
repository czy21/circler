package repository

import (
	"czy-erp.com/src/entity/po"
	"github.com/go-xorm/xorm"
)

type Company struct {
	dbContext *xorm.Engine
}

func (r *Company) SelectAll() *[]po.Company {
	var companies []po.Company
	return &companies
}
