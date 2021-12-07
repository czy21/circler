package com.circler.api.kind;

public enum GenderKind {
    Male("男", 1),
    Female("女", 0);

    String label;
    Integer value;

    GenderKind(String label, Integer value) {
        this.label = label;
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public Integer getValue() {
        return value;
    }
}
