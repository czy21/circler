package com.circler.api.model.query;

import lombok.Data;

@Data
public class PageQuery {
    private Integer pageIndex = 1;
    private Integer pageSize = 10;
}
