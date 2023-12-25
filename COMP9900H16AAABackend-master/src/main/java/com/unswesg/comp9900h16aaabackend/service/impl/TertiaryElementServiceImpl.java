package com.unswesg.comp9900h16aaabackend.service.impl;

import com.unswesg.comp9900h16aaabackend.Mapper.TertiaryElementMapper;
import com.unswesg.comp9900h16aaabackend.model.Indicator;
import com.unswesg.comp9900h16aaabackend.model.TertiaryElement;
import com.unswesg.comp9900h16aaabackend.service.TertiaryElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TertiaryElementServiceImpl implements TertiaryElementService {
    @Autowired
    private TertiaryElementMapper tertiaryElementMapper;

    @Override
    public TertiaryElement getTertiaryElementById(Integer id){
        return tertiaryElementMapper.getTertiaryElementById(id);
    }

    @Override
    public List<Indicator> getIndicators(Integer id){
        return tertiaryElementMapper.getIndicators(id);
    }

    @Override
    public void insertTertiaryElement(TertiaryElement tertiaryElement){
        tertiaryElementMapper.insertTertiaryElement(tertiaryElement);
    }

}
