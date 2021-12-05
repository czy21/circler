package com.circler.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(path = "db")
public class DBController {

    @PostMapping(path = "instance/search")
    public Map<String, Object> instanceSearch() {
        return Map.of();
    }

    @PostMapping(path = "instance/add")
    public Map<String, Object> instanceAdd() {
        return Map.of();
    }

    @PostMapping(path = "instance/ping")
    public Map<String, Object> instancePing() {

        return Map.of();
    }
}
