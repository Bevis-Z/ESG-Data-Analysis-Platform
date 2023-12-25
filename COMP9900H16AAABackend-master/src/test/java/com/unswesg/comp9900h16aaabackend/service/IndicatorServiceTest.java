package com.unswesg.comp9900h16aaabackend.service;

import com.unswesg.comp9900h16aaabackend.model.Indicator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class IndicatorServiceTest {
    @Autowired
    private IndicatorService indicatorService;

    @Test
    public void testGetIndicatorById(){

        Indicator result = indicatorService.getIndicatorById(1);
        Assertions.assertEquals(result.getIndicatorName(), "Increased pricing of GHG emissions");
        Assertions.assertEquals(result.getIndicatorId(), (Integer)1);
        Assertions.assertEquals(result.getTertiaryElementId(),(Integer)1);
        result = indicatorService.getIndicatorById(2);
        Assertions.assertEquals(result.getIndicatorName(), "Enhanced emissions-reporting obligations");
        Assertions.assertEquals(result.getIndicatorId(), (Integer)2);
        Assertions.assertEquals(result.getTertiaryElementId(),(Integer)1);
        result = indicatorService.getIndicatorById(3);
        Assertions.assertEquals(result.getIndicatorName(), "Costs to transition to lower emissions technology");
        Assertions.assertEquals(result.getIndicatorId(), (Integer)3);
        Assertions.assertEquals(result.getTertiaryElementId(),(Integer)2);

    }
}
