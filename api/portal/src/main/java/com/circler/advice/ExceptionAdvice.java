package com.circler.advice;

import com.circler.constant.ResponseConstant;
import com.circler.exception.BusinessException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@ResponseBody
public class ExceptionAdvice {

    public static final String UN_KNOW_SERVER_ERROR = "UN_KNOW_SERVER_ERROR";

    @ExceptionHandler(value = Exception.class)
    public Map<String, Object> exceptionHandler(Exception e) {
        Map<String, Object> result = new HashMap<>();
        result.put(ResponseConstant.TIMESTAMP_KEY, LocalDateTime.now());
        if (e instanceof BusinessException) {
            result.put(ResponseConstant.ERROR_KEY, ((BusinessException) e).getMap());
        } else {
            result.put(ResponseConstant.ERROR_KEY, Map.of(ResponseConstant.ERROR_CODE_KEY, UN_KNOW_SERVER_ERROR));
        }
        e.printStackTrace();
        return result;
    }
}
