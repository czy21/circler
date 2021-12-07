package com.circler.api.service;

import com.circler.api.kind.DBInstanceKind;
import com.circler.api.kind.GenderKind;
import com.circler.api.model.SimpleItemModel;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class OptionService implements InitializingBean {

    private final Map<String, Function<Map<String, Object>, List<SimpleItemModel<?>>>> optionMapFn = new HashMap<>();

    public Map<String, List<SimpleItemModel<?>>> get(List<String> keys) {
        return keys.stream().collect(HashMap::new, (m, v) -> m.put(v, Optional.ofNullable(optionMapFn.get(v)).map(t -> t.apply(Map.of())).orElse(null)), Map::putAll);
    }

    public Map<String, List<SimpleItemModel<?>>> get(String key, Map<String, Object> param) {
        return Stream.of(key).collect(HashMap::new, (m, v) -> m.put(v, Optional.ofNullable(optionMapFn.get(v)).map(t -> t.apply(Map.of())).orElse(null)), Map::putAll);
    }

    @Override
    public void afterPropertiesSet() {
        optionMapFn.put("dbInstanceKind", (param) -> EnumUtils.getEnumList(DBInstanceKind.class).stream().map(t -> SimpleItemModel.of(t.name(), t.name())).collect(Collectors.toList()));
        optionMapFn.put("genderKind", (param) -> EnumUtils.getEnumList(GenderKind.class).stream().map(t -> SimpleItemModel.of(t.getLabel(), t.getValue())).collect(Collectors.toList()));
    }
}
