package repository

import (
	"czy-erp.com/src/entity/po"
)

type User struct {
}

func (User) SelectAll() *[]po.UserDepartmentCompany {
	users := []po.UserDepartmentCompany{}
	_ = dbContext.Alias("u").
		Select(""+
			"u.*,"+
			"d.name,"+
			"c.name").
		Join("inner", "ent_sys_department d", "d.id = u.department_id").
		Join("inner", "ent_sys_company c", "c.id = d.company_id").
		Find(&users)
	return &users
}

func (User) SelectPage() *[]po.UserDepartmentCompany {
	users := make([]po.UserDepartmentCompany, 0)
	//_ = dbContext.SQL(userBasicSQL+"  LIMIT ? OFFSET ? ", 2, 1).
	//	Where("u.name = ", "王五").
	//	Find(&users)
	return &users
}
