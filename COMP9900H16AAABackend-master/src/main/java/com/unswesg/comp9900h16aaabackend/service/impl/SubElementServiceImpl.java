package com.unswesg.comp9900h16aaabackend.service.impl;


import com.unswesg.comp9900h16aaabackend.Mapper.SubElementMapper;
import com.unswesg.comp9900h16aaabackend.model.SubElement;
import com.unswesg.comp9900h16aaabackend.model.TertiaryElement;
import com.unswesg.comp9900h16aaabackend.service.SubElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubElementServiceImpl implements SubElementService {
    @Autowired
    private SubElementMapper subElementMapper;

    @Override
    public SubElement getSubElementById(Integer id){
        return subElementMapper.getSubElementById(id);
    }

    @Override
    public List<TertiaryElement> getTertiaryElements(Integer id){
        return subElementMapper.getTertiaryElements(id);
    }

    @Override
    public void insertSubElement(SubElement subElement){
        subElementMapper.insertSubElement(subElement);
    }

}
