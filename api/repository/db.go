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
	//sql:="INSERT INTO `circler`.`db_instance` (`id`, `host`, `port`, `username`, `password`, `kind`, `created_date`, `created_user`, `modified_date`, `modified_user`)"
}
