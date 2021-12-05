package com.circler.api.automap;


import com.circler.api.core.CentralConfig;
import com.circler.api.entity.DBInstancePO;
import com.circler.api.model.PageResult;
import com.circler.api.model.dto.DBInstanceDTO;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(config = CentralConfig.class)
public interface DBAutoMap {

    DBInstanceDTO mapToInstanceDTO(DBInstancePO po);

    List<DBInstanceDTO> mapToInstanceDTOs(List<DBInstancePO> po);

    PageResult<DBInstanceDTO> mapToInstancePageDTO(PageResult<DBInstancePO> pagePO);
}
