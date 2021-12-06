package com.circler.api.controller;

import com.circler.api.core.BaseController;
import com.circler.api.model.query.OptionQuery;
import com.circler.api.service.OptionService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "option")
public class OptionController extends BaseController {

    @Autowired
    OptionService optionService;

    @PostMapping(path = "query")
    public Map<String, Object> query(@RequestBody OptionQuery query) {
        Map<String, Object> optionMap = new HashMap<>();
        if (StringUtils.isNotEmpty(query.getKey())) {
            optionMap.putAll(optionService.get(query.getKey(), query.getParam()));
        }
        List<String> keys = query.getKeys().stream().filter(StringUtils::isNotEmpty).collect(Collectors.toList());
        if (!CollectionUtils.isEmpty(keys)) {
            optionMap.putAll(optionService.get(keys));
        }
        return optionMap;
    }
}
