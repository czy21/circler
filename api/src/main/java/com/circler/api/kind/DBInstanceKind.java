package com.circler.api.kind;

public enum DBInstanceKind {
    MYSQL("com.mysql.cj.jdbc.Driver"),
    PGSQL("com.mysql.cj.jdbc.Driver");

    String driverClassName;

    DBInstanceKind(String driverClassName) {
        this.driverClassName = driverClassName;
    }

    public String getDriverClassName() {
        return driverClassName;
    }
}
