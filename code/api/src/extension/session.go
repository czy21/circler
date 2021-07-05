package extension

import "github.com/go-xorm/xorm"

func Page(session *xorm.Session, pageIndex int, pageSize int) *xorm.Session {
	return session.Limit(pageSize, (pageIndex-1)*pageSize)
}
