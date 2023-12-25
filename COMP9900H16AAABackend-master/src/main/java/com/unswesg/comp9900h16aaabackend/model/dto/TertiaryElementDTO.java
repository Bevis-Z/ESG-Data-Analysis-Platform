package com.unswesg.comp9900h16aaabackend.model.dto;


import com.unswesg.comp9900h16aaabackend.model.TertiaryElement;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class TertiaryElementDTO extends ScoreEntityDTO{

    private Integer tertiaryElementId;
    private Integer subElementId;
    private String tertiaryElementName;
    private Double eleWeight;
    private List<IndicatorDTO> indicatorDTOList;

    public TertiaryElementDTO(){
        this.indicatorDTOList=new ArrayList<IndicatorDTO>();
    }
}
