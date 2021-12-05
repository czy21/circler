package com.circler.api.model;

import lombok.Data;

@Data
public class PageModel {
    private Long pageIndex;
    private Long pageSize;
    private Long total;
}
