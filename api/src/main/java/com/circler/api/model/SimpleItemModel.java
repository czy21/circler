package com.circler.api.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
@EqualsAndHashCode
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class SimpleItemModel<T> {
    private String label;
    private T value;
    private T parentValue;
    private Object extra;
    private List<SimpleItemModel<T>> children;

    private SimpleItemModel(String label, T value) {
        this.label = label;
        this.value = value;
    }

    public static <T> SimpleItemModel<T> of(String label, T value) {
        return new SimpleItemModel<>(label, value);
    }

}
