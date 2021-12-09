package com.circler.api.core;


import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionAdvice {

    public static final String UN_KNOW_SERVER_ERROR = "UN_KNOW_SERVER_ERROR";

    @ExceptionHandler(value = Exception.class)
    public Map<String, Object> exceptionHandler(Exception e) {
        Map<String, Object> result = new HashMap<>();
        result.put(BaseController.RESPONSE_TIMESTAMP_KEY, LocalDateTime.now());
        Map<String, Object> error = new HashMap<>();
        if (e instanceof BusinessException) {
            error.put("code", ((BusinessException) e).getCode());
            error.put("message", e.getMessage());
        } else if (e instanceof MethodArgumentNotValidException) {
            List<Object> validErrors = ((MethodArgumentNotValidException) e).getBindingResult().getAllErrors().stream()
                    .map(t -> {
                        Map<String, Object> em = new HashMap<>();
                        if (t instanceof FieldError) {
                            em.put("field", ((FieldError) t).getField());
                            em.put("code", t.getCode());
                            em.put("message", t.getDefaultMessage());
                            return em;
                        }
                        return t;
                    }).collect(Collectors.toList());
            error.put("valid", validErrors);
        } else {
            error.put("code", UN_KNOW_SERVER_ERROR);
            error.put("message", e.getMessage());
        }
        result.put(BaseController.RESPONSE_ERROR_KEY, error);
        e.printStackTrace();
        return result;
    }

}
