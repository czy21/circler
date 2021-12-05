package com.circler.api.model.dto;

import com.circler.api.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class DBInstanceDTO extends BaseEntity<Long> {
    private String name;
    private String host;
    private String port;
    private String username;
    private String password;
    private String kind;
}
