package com.circler.api.model;

import lombok.Data;

@Data
public class PageModel {
    private Integer pageIndex;
    private Integer pageSize;
    private Integer total;
}
