package com.circler.api.core;

import java.util.List;

public interface BaseAutoMap<S, T> {

    T mapToTarget(S entity);

    S mapToSource(T dto);

    List<T> mapToTargets(List<S> entities);

    List<S> mapToSources(List<T> dtos);


}
