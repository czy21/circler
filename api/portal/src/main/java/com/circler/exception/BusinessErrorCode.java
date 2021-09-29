package com.circler.exception;

public enum BusinessErrorCode {
    NO_EXIST_USER("用户不存在"),
    EXIST_USER("用户已存在"),
    EXIST_NAME("名称已存在"),
    NO_NULL_ID("Id不能为空"),
    NO_NULL_NAME("名称不能为空"),
    NO_NULL_VALUE("值不能为空");
    String message;

    BusinessErrorCode(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
