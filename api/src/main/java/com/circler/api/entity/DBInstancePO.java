package com.circler.api.entity;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class DBInstancePO extends BaseEntity<Long> {

    private String name;
    private String host;
    private String port;
    private String username;
    private String password;
    private String kind;

}
