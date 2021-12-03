package repository

import "github.com/czyhome/circler/entity"

type DbInstance struct {
}

func (DbInstance) SelectAll() []entity.DbInstanceMetaPO {
	var dbInstances []entity.DbInstanceMetaPO
	dbClient.Find(&dbInstances)
	return dbInstances
}

func (DbInstance) InsertOne(po entity.DbInstanceMetaPO) {
	dbClient.Create(&po)
}
