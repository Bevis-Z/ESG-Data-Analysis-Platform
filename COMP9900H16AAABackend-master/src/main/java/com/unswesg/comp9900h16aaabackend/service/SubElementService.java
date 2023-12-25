package com.unswesg.comp9900h16aaabackend.service;

import com.unswesg.comp9900h16aaabackend.model.SubElement;
import com.unswesg.comp9900h16aaabackend.model.TertiaryElement;
import org.springframework.stereotype.Service;

import java.util.List;


public interface SubElementService {
    SubElement getSubElementById(Integer id);

    List<TertiaryElement> getTertiaryElements(Integer id);

    void insertSubElement(SubElement subElement);
}
