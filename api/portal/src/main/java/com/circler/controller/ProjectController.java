package com.circler.controller;

import com.circler.annotation.ResponseWrapper;
import com.circler.model.SearchModel;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@ResponseWrapper
@RestController
@RequestMapping(path = "k8s/project")
public class ProjectController {


    @PostMapping(path = "list")
    public List<?> list(@RequestBody SearchModel input) {

        return List.of(Map.of("name", "hello"));
    }



}
