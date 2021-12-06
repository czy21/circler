package com.circler.api.service;

import com.circler.api.model.PageResult;
import com.circler.api.model.dto.DBInstanceDTO;
import com.circler.api.model.query.DBInstanceQuery;

public interface DBService {

    PageResult<DBInstanceDTO> pageInstance(DBInstanceQuery query);

    void addInstance(DBInstanceDTO dto);

    Boolean pingInstance(DBInstanceDTO dto) throws Exception;

}
