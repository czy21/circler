package com.circler.api.kind;

public enum DBInstanceKind {
    MySQL("com.mysql.cj.jdbc.Driver"),
    PostgreSQL("com.mysql.cj.jdbc.Driver");

    String driverClassName;

    DBInstanceKind(String driverClassName) {
        this.driverClassName = driverClassName;
    }

    public String getDriverClassName() {
        return driverClassName;
    }
}
