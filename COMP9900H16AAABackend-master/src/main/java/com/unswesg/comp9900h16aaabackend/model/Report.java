package com.unswesg.comp9900h16aaabackend.model;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@Data
@TableName(value="Reports")
public class Report implements Serializable {
    @TableId(type= IdType.AUTO)
    private Integer reportEleId;
    private Integer reportId;
    private Integer userId;
    private String companyName;
    private Integer indicatorId;
    private Double iptValue;
    private Integer framework_id;
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
