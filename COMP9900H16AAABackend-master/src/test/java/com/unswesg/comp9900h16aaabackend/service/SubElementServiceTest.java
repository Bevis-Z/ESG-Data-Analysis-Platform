package com.unswesg.comp9900h16aaabackend.service;


import com.unswesg.comp9900h16aaabackend.Mapper.SubElementMapper;
import com.unswesg.comp9900h16aaabackend.model.Framework;
import com.unswesg.comp9900h16aaabackend.model.SubElement;
import com.unswesg.comp9900h16aaabackend.model.TertiaryElement;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

@SpringBootTest
public class SubElementServiceTest {

    @Autowired
    private SubElementService subElementService;

    @Test
    public void testGetSubElementById() {
        SubElement result = subElementService.getSubElementById(1);
        Assertions.assertEquals(result.getSubElementId(), (Integer)1);
        Assertions.assertEquals(result.getSubElementName(), "Transition Risk");
        Assertions.assertEquals(result.getFrameworkId(),(Integer)1);
    }
    @Test
    public void testGetTertiaryElements(){
        ArrayList<TertiaryElement> result = new ArrayList<TertiaryElement>(subElementService.getTertiaryElements(1));
        Assertions.assertEquals(result.size(),4);
        Assertions.assertEquals(result.get(0).getTertiaryEelementName(),"Policy and Legal");
        Assertions.assertEquals(result.get(1).getTertiaryEelementName(),"Technology");
        Assertions.assertEquals(result.get(2).getTertiaryEelementName(),"Market");
        Assertions.assertEquals(result.get(3).getTertiaryEelementName(),"Reputation");
        result = new ArrayList<TertiaryElement>(subElementService.getTertiaryElements(2));
        Assertions.assertEquals(result.size(),2);
        Assertions.assertEquals(result.get(0).getTertiaryEelementName(),"Acute");
        Assertions.assertEquals(result.get(1).getTertiaryEelementName(),"Chronic");
    }
}
