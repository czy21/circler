package com.circler.api.model.dto;

import com.circler.api.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotBlank;

@EqualsAndHashCode(callSuper = true)
@Data
public class DBInstanceDTO extends BaseEntity<Long> {

    private String name;
    @NotBlank
    private String host;
    @NotBlank
    private String port;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @NotBlank
    private String kind;
}
