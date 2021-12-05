package com.circler.api.core;

import org.mapstruct.MapperConfig;
import org.mapstruct.ReportingPolicy;

@MapperConfig(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CentralConfig {

}
