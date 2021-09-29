package com.circler.config;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.system.ApplicationHome;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class InitConfigure {
    private static final String APPLICATION_PATH = new ApplicationHome(InitConfigure.class).getDir().getAbsolutePath();

    @Value("${data-dir}")
    private String dataDir;

    @SneakyThrows
    public Path getDataDir() {
        Path f = Paths.get(dataDir);
        return f.isAbsolute() ? f : Paths.get(APPLICATION_PATH, f.toString());
    }

    public Path getClusterDir() {
        return getDataDir().resolve("cluster");
    }

}
