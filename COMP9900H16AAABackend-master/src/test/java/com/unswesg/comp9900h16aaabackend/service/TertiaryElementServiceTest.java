package com.unswesg.comp9900h16aaabackend.service;

import com.unswesg.comp9900h16aaabackend.Mapper.TertiaryElementMapper;
import com.unswesg.comp9900h16aaabackend.model.Indicator;
import com.unswesg.comp9900h16aaabackend.model.SubElement;
import com.unswesg.comp9900h16aaabackend.model.TertiaryElement;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
@SpringBootTest
public class TertiaryElementServiceTest {



    @Autowired
    private TertiaryElementService tertiaryElementService;

    @Test
    public void testGetSubElementById() {
        TertiaryElement result = tertiaryElementService.getTertiaryElementById(1);
        Assertions.assertEquals(result.getSubElementId(), (Integer)1);
        Assertions.assertEquals(result.getTertiaryEelementName(), "Policy and Legal");
        Assertions.assertEquals(result.getTertiaryElementId(),(Integer)1);
    }
    @Test
    public void testGetTertiaryElements(){
        ArrayList<Indicator> result = new ArrayList<Indicator>(tertiaryElementService.getIndicators(1));
        Assertions.assertEquals(result.size(),2);
        Assertions.assertEquals(result.get(0).getIndicatorName(),"Increased pricing of GHG emissions");
        Assertions.assertEquals(result.get(1).getIndicatorName(),"Enhanced emissions-reporting obligations");
        result = new ArrayList<Indicator>(tertiaryElementService.getIndicators(2));
        Assertions.assertEquals(result.size(),1);
        Assertions.assertEquals(result.get(0).getIndicatorName(),"Costs to transition to lower emissions technology");
    }
}
