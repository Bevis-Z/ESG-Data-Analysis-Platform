package com.unswesg.comp9900h16aaabackend.model.dto;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class FrameworkDTO extends ScoreEntityDTO{
    private Integer frameworkId;
    private String frameworkName;
    private Integer userId;
    private List<SubElementDTO> subElementDTOList;

    public FrameworkDTO() {
        this.subElementDTOList = new ArrayList<>();
    }
}
