package com.unswesg.comp9900h16aaabackend.Mapper;

import com.unswesg.comp9900h16aaabackend.model.SubElement;
import com.unswesg.comp9900h16aaabackend.model.TertiaryElement;

import java.util.List;

public interface SubElementMapper {

    SubElement getSubElementById(Integer id);

    List<TertiaryElement> getTertiaryElements(Integer id);

    void insertSubElement(SubElement subElement);


}
