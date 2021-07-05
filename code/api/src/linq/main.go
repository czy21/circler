package main

import (
	"fmt"
	"github.com/ahmetb/go-linq/v3"
	"github.com/emirpasic/gods/lists/arraylist"
)

type Man struct {
	Name  string
	Girls []Woman
}
type Woman struct {
	Name string
}

func main() {
	man1 := Man{
		Name: "张三",
		Girls: []Woman{
			{Name: "王女士"},
			{Name: "李女士"}}}
	man2 := Man{
		Name: "李四",
		Girls: []Woman{
			{Name: "孙女士"},
			{Name: "胡女士"}}}
	women := linq.From(arraylist.New(man1, man2).Values()).SelectManyT(func(m Man) linq.Query {
		return linq.From(m.Girls).SelectT(func(i Woman) string {
			return i.Name
		})
	}).Results()
	fmt.Println(women)
}
