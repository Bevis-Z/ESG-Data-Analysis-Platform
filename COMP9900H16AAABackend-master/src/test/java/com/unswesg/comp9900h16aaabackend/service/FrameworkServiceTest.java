package com.unswesg.comp9900h16aaabackend.service;

import com.unswesg.comp9900h16aaabackend.model.Framework;

import com.unswesg.comp9900h16aaabackend.model.SubElement;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class FrameworkServiceTest {
    @Autowired
    private FrameworkService frameworkService;

    @Test
    public void testGetFrameworkById() {
        Framework result = frameworkService.getFrameworkById(1);
        Assertions.assertEquals(result.getFrameworkId(), (Integer)1);
        Assertions.assertEquals(result.getFrameworkName(), "TCFD");
        Assertions.assertEquals(result.getUserId(),(Integer)1);
    }
    @Test
    public void testGetSecondLevelElements(){
        ArrayList<SubElement> result = new ArrayList<SubElement>(frameworkService.getSecondLevelElements(1));
        Assertions.assertEquals(result.size(),2);
        Assertions.assertEquals(result.get(0).getSubElementName(),"Transition Risk");
        Assertions.assertEquals(result.get(1).getSubElementName(),"Physical Risk");
    }


}
