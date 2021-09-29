package com.circler.exception;


import com.circler.constant.ResponseConstant;
import lombok.SneakyThrows;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class BusinessException extends RuntimeException {

    private final Map<String, Object> map = new HashMap<>();

    public BusinessException(String code, String message) {
        super(message);
        map.put(ResponseConstant.ERROR_CODE_KEY, code);
        map.put(ResponseConstant.ERROR_MESSAGE_KEY, message);
    }

    public static BusinessException of(String code, String message) {
        return new BusinessException(code, message);
    }

    @SneakyThrows
    public static <T extends Enum<T>> BusinessException of(T t, String message) {
        Method nameMethod = t.getClass().getMethod("name");
        return of((String) nameMethod.invoke(t), message != null ? message : (String) t.getClass().getMethod("getMessage").invoke(t));
    }

    @SneakyThrows
    public static <T extends Enum<T>> BusinessException of(T t) {
        return of(t, null);
    }

    public Map<String, Object> getMap() {
        return map;
    }

}
