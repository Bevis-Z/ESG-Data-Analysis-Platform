package com.unswesg.comp9900h16aaabackend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.unswesg.comp9900h16aaabackend.model.Framework;
import com.unswesg.comp9900h16aaabackend.model.SubElement;
import com.unswesg.comp9900h16aaabackend.model.dto.FrameworkDTO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface FrameworkService  {
    Framework getFrameworkById(Integer id);
    List<SubElement> getSecondLevelElements(Integer id);

    FrameworkDTO getFrameworkTree(Integer id);

    void insertFramework(Framework framework);

    void insertFrameworkTree(FrameworkDTO frameworkDTO, Integer userId,String companyName,boolean edit);
    void applyFramework(FrameworkDTO framework,String companyName, Integer userId);
    void unboundFramework(Integer frameworkId);

    List<Integer> getTargetFramework();


}
