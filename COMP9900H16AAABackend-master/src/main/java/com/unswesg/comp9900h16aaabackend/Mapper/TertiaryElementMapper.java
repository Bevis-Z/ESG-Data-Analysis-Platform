package com.unswesg.comp9900h16aaabackend.Mapper;

import com.unswesg.comp9900h16aaabackend.model.Indicator;
import com.unswesg.comp9900h16aaabackend.model.TertiaryElement;

import java.util.List;

public interface TertiaryElementMapper {
    TertiaryElement getTertiaryElementById(Integer id);
    List<Indicator> getIndicators(Integer id);

    void insertTertiaryElement(TertiaryElement tertiaryElement);

}
