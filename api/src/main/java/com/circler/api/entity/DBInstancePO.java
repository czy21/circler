package com.circler.api.entity;


import com.circler.api.kind.DBInstanceKind;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class DBInstancePO extends BaseEntity {

    private String name;
    private String host;
    private String port;
    private String username;
    private String password;
    private DBInstanceKind kind;

}
