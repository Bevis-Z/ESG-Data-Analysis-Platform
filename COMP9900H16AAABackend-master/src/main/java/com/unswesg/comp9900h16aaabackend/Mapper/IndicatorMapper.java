package com.unswesg.comp9900h16aaabackend.Mapper;

import com.unswesg.comp9900h16aaabackend.model.Indicator;
import com.unswesg.comp9900h16aaabackend.model.dto.IndicatorDTO;

import java.util.List;

public interface IndicatorMapper {
    Indicator getIndicatorById(Integer id);

    void insertIndicator(Indicator indicator);
}
