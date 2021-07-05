package dto

import (
	"czy-erp.com/src/entity/po"
	"github.com/ahmetb/go-linq/v3"
)

type Department struct {
	Name *string `json:"name"`
}

func (_ Department) MapToDtos(depts []po.Department) []interface{} {
	return linq.From(depts).
		SelectT(func(d po.Department) Department {
			return Department.MapToDto(Department{}, d)
		}).Results()
}

func (_ Department) MapToDto(dept po.Department) Department {
	return Department{
		Name: dept.Name,
	}
}
