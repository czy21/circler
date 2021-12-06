package com.circler.api.core;

import com.circler.api.annotation.Option;
import com.circler.api.service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.time.LocalDateTime;
import java.util.*;

@ControllerAdvice(assignableTypes = BaseController.class)
public class ResponseAdvice implements ResponseBodyAdvice<Object> {

    @Autowired
    OptionService optionService;

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        return converterType.isAssignableFrom(MappingJackson2HttpMessageConverter.class);
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        Map<String, Object> result = new HashMap<>();
        result.put(BaseController.RESPONSE_TIMESTAMP_KEY, LocalDateTime.now());
        result.put(BaseController.RESPONSE_DATA_KEY, body);
        List<String> optionKeys = Arrays.asList(Optional.ofNullable(returnType.getMethodAnnotation(Option.class)).map(Option::value).orElse(new String[]{}));
        if (!CollectionUtils.isEmpty(optionKeys)) {
            result.put(BaseController.RESPONSE_OPTION_KEY, optionService.get(optionKeys));
        }
        return result;
    }
}