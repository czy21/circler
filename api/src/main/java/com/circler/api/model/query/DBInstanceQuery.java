package com.circler.api.model.query;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class DBInstanceQuery extends PageQuery {
    private Long id;
}
