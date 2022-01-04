package com.circler.api.service.impl;

import com.circler.api.automap.DBAutoMap;
import com.circler.api.core.BusinessException;
import com.circler.api.entity.DBInstancePO;
import com.circler.api.kind.DBInstanceKind;
import com.circler.api.mapper.DBInstanceMapper;
import com.circler.api.model.PageResult;
import com.circler.api.model.dto.DBInstanceDTO;
import com.circler.api.model.query.DBInstanceQuery;
import com.circler.api.service.DBService;
import com.circler.api.util.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.text.MessageFormat;

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

    @Transactional
    @Override
    public void addInstance(DBInstanceDTO dto) {
        DBInstancePO po = dbAutoMap.mapToInstancePO(dto);
        dbInstanceMapper.insertOne(po);
    }

    @Override
    public Boolean pingInstance(DBInstanceDTO dto) {
        try {
            DBInstanceKind instanceKind = DBInstanceKind.valueOf(dto.getKind());
            Class.forName(instanceKind.getDriverClassName());
            String jdbcUrl = MessageFormat.format("jdbc:{0}://{1}:{2}/", instanceKind.name().toLowerCase(), dto.getHost(), dto.getPort());
            Connection connection = DriverManager.getConnection(jdbcUrl, dto.getUsername(), dto.getPassword());
            Statement statement = connection.createStatement();
            return statement.execute("select 1");
        } catch (Exception e) {
            throw new BusinessException("", e.getMessage());
        }
    }
}
