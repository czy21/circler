package com.circler.api.mapper;

import com.circler.api.entity.DBInstancePO;
import com.circler.api.model.query.DBInstanceQuery;

import java.util.List;

public interface DBInstanceMapper {
    int insertOne(DBInstancePO po);

    int updateById(Long id);

    List<DBInstancePO> selectListBy(DBInstanceQuery query);
}
