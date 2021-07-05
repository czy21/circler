package service

import (
	"czy-erp.com/src/entity/dto"
	"czy-erp.com/src/entity/po"
	"czy-erp.com/src/extension"
	"czy-erp.com/src/repository"
)

type User struct {
	userRepository *repository.User
}

func (s *User) FindAll() []interface{} {
	return dto.User{}.MapToDtos(*s.userRepository.SelectAll())
}

func (User) FindAllByPage(vo *dto.User) []interface{} {
	dbContext := repository.GetDBContext()
	users := []po.UserDepartmentCompany{}
	query := dbContext.Alias("u").
		Select(""+
			"u.*,"+
			"d.name,"+
			"c.name").
		Join("inner", "ent_sys_department d", "d.id = u.department_id").
		Join("inner", "ent_sys_company c", "c.id = d.company_id")
	if vo.UserName != nil {
		query.And("u.user_name = ?", vo.UserName)
	}
	_ = extension.Page(query, vo.Page.PageIndex, vo.Page.PageSize).
		Find(&users)
	return dto.User{}.MapToDtos(users)
}
