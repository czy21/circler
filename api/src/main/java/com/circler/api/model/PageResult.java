package com.circler.api.model;


import lombok.Data;

import java.util.List;

@Data
public class PageResult<T> {
    private PageModel page;
    private List<T> list;
}