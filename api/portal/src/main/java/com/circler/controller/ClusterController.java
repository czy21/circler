package com.circler.controller;

import com.circler.annotation.ResponseWrapper;
import com.circler.config.InitConfigure;
import com.circler.model.ClusterModel;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@ResponseWrapper
@RestController
@RequestMapping(path = "k8s/cluster")
@Slf4j
public class ClusterController {

    @Autowired
    InitConfigure initConfigure;

    @PostMapping(path = "list")
    public List<?> list() {
        File clusterDir = initConfigure.getClusterDir().toFile();
        if (clusterDir.list() == null) {
            clusterDir.mkdirs();
        }
        return List.of(Map.of("name", "hello"));
    }

    @SneakyThrows
    @PostMapping(path = "create")
    public String create(@RequestBody ClusterModel input) {
        Path envPath = initConfigure.getClusterDir().resolve(input.getName());
        Path metaPath = envPath.resolve("meta.json");
        Path configPath = envPath.resolve("config.yaml");
        envPath.toFile().mkdirs();
        FileUtils.
        return "";
    }

}
