package com.circler.controller;

import com.circler.annotation.ResponseWrapper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@ResponseWrapper
@RestController
@RequestMapping(path = "k8s/volume")
public class VolumeController {


    @PostMapping(path = "list")
    public List<?> list() {
        return List.of(Map.of("name", "hello"));
    }

}
