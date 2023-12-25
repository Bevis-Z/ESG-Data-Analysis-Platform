package com.unswesg.comp9900h16aaabackend.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;


@Data
@TableName(value="Indicators")
public class Indicator implements Serializable {

    @TableId(type = IdType.AUTO)
    private Integer indicatorId;
    private Integer tertiaryElementId;
    private String indicatorName;
    private Double eleWeight;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;


}
