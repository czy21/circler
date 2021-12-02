package repository

import "github.com/czyhome/circler/entity"

type DbInstance struct {

}

func (DbInstance) SelectAll() []entity.DbInstanceMetaPO {
	var dbInstances []entity.DbInstanceMetaPO
	dbClient.Raw("select * from db_instance").Scan(&dbInstances)
	return dbInstances
}