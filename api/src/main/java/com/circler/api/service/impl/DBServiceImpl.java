package com.circler.api.service.impl;

import com.circler.api.automap.DBAutoMap;
import com.circler.api.mapper.DBInstanceMapper;
import com.circler.api.model.PageResult;
import com.circler.api.model.dto.DBInstanceDTO;
import com.circler.api.model.query.DBInstanceQuery;
import com.circler.api.service.DBService;
import com.circler.api.util.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DBServiceImpl implements DBService {

    @Autowired
    DBInstanceMapper dbInstanceMapper;
    @Autowired
    DBAutoMap dbAutoMap;

    @Override
    public PageResult<DBInstanceDTO> pageInstance(DBInstanceQuery query) {
        return dbAutoMap.mapToInstancePageDTO(PageUtil.apply((q) -> dbInstanceMapper.selectListBy(q), query));
    }

    @Override
    public Boolean instancePing() {
        return null;
    }
}
