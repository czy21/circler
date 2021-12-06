package com.circler.api.controller;

import com.circler.api.annotation.Option;
import com.circler.api.core.BaseController;
import com.circler.api.model.PageResult;
import com.circler.api.model.dto.DBInstanceDTO;
import com.circler.api.model.query.DBInstanceQuery;
import com.circler.api.service.DBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "db")
public class DBController extends BaseController {

    @Autowired
    DBService dbService;

    @Option(value = {
            "dbInstanceKind"
    })
    @PostMapping(path = "instance/search")
    public PageResult<DBInstanceDTO> instanceSearch(@RequestBody DBInstanceQuery query) {
        return dbService.pageInstance(query);
    }

    @PostMapping(path = "instance/add")
    public Boolean instanceAdd(@RequestBody DBInstanceDTO dto) {
        dbService.addInstance(dto);
        return true;
    }

    @PostMapping(path = "instance/ping")
    public Boolean instancePing(@RequestBody DBInstanceDTO dto) throws Exception {
        return dbService.pingInstance(dto);
    }
}
