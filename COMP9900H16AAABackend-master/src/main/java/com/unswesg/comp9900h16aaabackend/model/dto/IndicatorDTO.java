package com.unswesg.comp9900h16aaabackend.model.dto;


import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class IndicatorDTO extends ScoreEntityDTO{
    private Integer indicatorId;
    private Integer tertiaryElementId;
    private String indicatorName;
    private Double eleWeight;
    private Double iptValue;

}
