package po

import "time"

type Department struct {
	ID *string

	Name      *string
	CompanyId *string

	CreatedDate  *time.Time
	CreatedUser  *string
	ModifiedDate *time.Time
	ModifiedUser *string
}
