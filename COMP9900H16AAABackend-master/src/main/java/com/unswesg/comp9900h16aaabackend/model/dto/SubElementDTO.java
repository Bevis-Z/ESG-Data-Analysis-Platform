package com.unswesg.comp9900h16aaabackend.model.dto;


import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class SubElementDTO extends ScoreEntityDTO{


    private Integer subElementId;
    private Integer frameworkId;
    private String subElementName;
    private Double eleWeight;

    private List<TertiaryElementDTO> tertiaryElementDTOList;

    public SubElementDTO(){
        tertiaryElementDTOList=new ArrayList<TertiaryElementDTO>();
    }
}
