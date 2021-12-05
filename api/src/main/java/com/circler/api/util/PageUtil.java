package com.circler.api.util;

import com.circler.api.model.PageModel;
import com.circler.api.model.PageResult;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import java.util.List;
import java.util.function.Function;

public class PageUtil {

    public static <T, Q extends PageModel> PageResult<T> apply(Function<Q, List<T>> queryFn, Q filter) {
        PageHelper.startPage(filter.getPageIndex(), filter.getPageSize());
        PageInfo<T> pageInfo = new PageInfo<T>(queryFn.apply(filter));
        return PageResult.of(pageInfo.getPageNum(), pageInfo.getPageSize(), (int) pageInfo.getTotal(), pageInfo.getList());
    }

}
