package com.circler.api.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BaseEntity<TID> {
    private TID id;
    private String createdUser;
    private LocalDateTime createdDate;
    private String modifiedUser;
    private LocalDateTime modifiedDate;
}
