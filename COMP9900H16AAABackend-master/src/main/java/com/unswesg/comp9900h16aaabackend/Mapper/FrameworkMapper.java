package com.unswesg.comp9900h16aaabackend.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.unswesg.comp9900h16aaabackend.model.Framework;
import com.unswesg.comp9900h16aaabackend.model.SubElement;

import java.util.List;


public interface FrameworkMapper {

    Framework getFrameworkById(Integer id);
    List<SubElement> getSecondLevelElements(Integer id);

    void insertFramework(Framework framework);

    void insertFrameworkWithId(Framework framework);

    Framework getFrameworkByName(String frameworkName);

    void unboundFramework(Integer frameworkId);

    List<Integer> getTargetFramework();
    void deleteByFrameworkId(Integer id);
    Integer checkDiscard(Integer frameworkId);
}
