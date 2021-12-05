package service

import (
	"github.com/ahmetb/go-linq/v3"
)

func Option(keys []string) map[string][]interface{} {
	options := map[string]map[string]interface{}{}
	options["dbInstanceKind"] = map[string]interface{}{
		"MYSQL":      "MYSQL",
		"PostgreSQL": "PostgreSQL",
	}
	var dict map[string][]interface{}
	linq.From(options).
		WhereT(func(kv linq.KeyValue) bool {
			return linq.From(keys).Contains(kv.Key)
		}).ForEachT(func(kv linq.KeyValue) {

	})
	//q.ToMapByT(&dict, func(i interface{}) interface{} {
	//	return i
	//}, func(value interface{}) interface{} {
	//
	//	//v := linq.From(value).SelectT(func(kv linq.KeyValue) entity.SimpleItemModel {
	//	//	return entity.SimpleItemModel{Label: kv.Key.(string), Value: kv.Value}
	//	//}).Results()
	//	//return v
	//	return value
	//})
	return dict
}
