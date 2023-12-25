package com.unswesg.comp9900h16aaabackend.service;

import com.unswesg.comp9900h16aaabackend.model.Indicator;

public interface IndicatorService {
    Indicator getIndicatorById(Integer id);

    void insertIndicator(Indicator indicator);

}
