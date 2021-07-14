package dto

import (
	"github.com/czyhome/circler/src/entity/po"
	"github.com/ahmetb/go-linq/v3"
	"time"
)

type User struct {
	ID             *string    `json:"id,omitempty"`
	UserName       *string    `json:"userName,omitempty"`
	DepartmentName *string    `json:"departmentName,omitempty"`
	DepartmentId   *string    `json:"departmentId,omitempty"`
	DepartmentIds  *[]string  `json:"departmentIds,omitempty"`
	CompanyId      *string    `json:"companyId,omitempty"`
	CompanyIds     *[]string  `json:"companyIds,omitempty"`
	CompanyName    *string    `json:"companyName,omitempty"`
	CreatedDate    *time.Time `json:"createdDate,omitempty"`
	Page           Page       `json:"page,omitempty"`
}

func (User) MapToDtos(users []po.UserDepartmentCompany) []interface{} {
	return linq.From(users).
		SelectT(func(u po.UserDepartmentCompany) User {
			return User{}.MapToDto(u)
		}).Results()
}

func (User) MapToDto(u po.UserDepartmentCompany) User {
	return User{
		ID:             u.User.ID,
		UserName:       u.UserName,
		DepartmentName: u.Department.Name,
		CompanyName:    u.Company.Name,
		CreatedDate:    u.User.CreatedDate,
	}
}
