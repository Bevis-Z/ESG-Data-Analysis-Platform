package com.unswesg.comp9900h16aaabackend.service.impl;

import com.unswesg.comp9900h16aaabackend.Mapper.IndicatorMapper;
import com.unswesg.comp9900h16aaabackend.model.Indicator;
import com.unswesg.comp9900h16aaabackend.service.IndicatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class IndicatorImpl implements IndicatorService {
    @Autowired
    private IndicatorMapper indicatorMapper;
    @Override
    public Indicator getIndicatorById(Integer id){
        return indicatorMapper.getIndicatorById(id);
    }

    @Override
    public void insertIndicator(Indicator indicator){
        indicatorMapper.insertIndicator(indicator);
    }
}
