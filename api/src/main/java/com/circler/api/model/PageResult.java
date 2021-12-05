package com.circler.api.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PageResult<T> {
    private PageModel page;
    private List<T> list;

    public static <T> PageResult<T> of(Integer pageIndex, Integer pageSize, Integer total, List<T> list) {
        PageModel page = new PageModel();
        page.setPageIndex(pageIndex);
        page.setPageSize(pageSize);
        page.setTotal(total);
        return new PageResult<>(page, list);
    }
}