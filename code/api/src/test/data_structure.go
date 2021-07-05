package main

import (
	"fmt"
	"github.com/emirpasic/gods/lists/arraylist"
)

func main() {
	list := arraylist.New()
	list.Add("a")
	list.Add("b")
	list.Add("c")
	fmt.Print(list)
}
