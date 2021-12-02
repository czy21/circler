package entity

type UserPO struct {
	BaseEntity
}

func (UserPO) TableName() string {
	return "user"
}
