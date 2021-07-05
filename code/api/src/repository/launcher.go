package repository

var UserRepository *User
var CompanyRepository *Company
var DepartmentRepository *Department

func init() {
	UserRepository = &User{}
	CompanyRepository = &Company{}
	DepartmentRepository = &Department{}
}
