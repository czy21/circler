package service

import "czy-erp.com/src/repository"

var UserService *User

func init() {
	UserService = &User{repository.UserRepository}
}
