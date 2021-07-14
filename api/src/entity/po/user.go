package po

import "time"

type User struct {
	ID *string

	UserName     *string
	LoginName    *string
	Password     *string
	DepartmentId *string

	CreatedDate  *time.Time
	CreatedUser  *string
	ModifiedDate *time.Time
	ModifiedUser *string
}

type UserDepartmentCompany struct {
	User       `xorm:"extends"`
	Department `xorm:"extends"`
	Company    `xorm:"extends"`
}

func (UserDepartmentCompany) TableName() string {
	return "ent_sys_user"
}
