package com.circler.api.service;

import com.circler.api.model.PageResult;
import com.circler.api.model.dto.DBInstanceDTO;
import com.circler.api.model.query.DBInstanceQuery;

public interface DBService {

    PageResult<DBInstanceDTO> pageInstance(DBInstanceQuery query);

    Boolean instancePing();

}
