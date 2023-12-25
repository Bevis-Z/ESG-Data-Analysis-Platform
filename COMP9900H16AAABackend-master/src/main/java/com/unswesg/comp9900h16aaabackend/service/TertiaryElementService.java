package com.unswesg.comp9900h16aaabackend.service;

import com.unswesg.comp9900h16aaabackend.model.Indicator;
import com.unswesg.comp9900h16aaabackend.model.SubElement;
import com.unswesg.comp9900h16aaabackend.model.TertiaryElement;

import java.util.List;

public interface TertiaryElementService {
    TertiaryElement getTertiaryElementById(Integer id);
    List<Indicator> getIndicators(Integer id);

    void insertTertiaryElement(TertiaryElement tertiaryElement);
}
