package com.circler.api.model.query;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class OptionQuery {
    private String key;
    private List<String> keys;
    private Map<String, Object> param;
}
