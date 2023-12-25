package com.unswesg.comp9900h16aaabackend.service.impl;

import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.unswesg.comp9900h16aaabackend.Mapper.FrameworkMapper;
import com.unswesg.comp9900h16aaabackend.Mapper.ReportMapper;
import com.unswesg.comp9900h16aaabackend.common.ErrorCode;
import com.unswesg.comp9900h16aaabackend.exception.FrameworkException;
import com.unswesg.comp9900h16aaabackend.exception.LoginException;
import com.unswesg.comp9900h16aaabackend.model.*;
import com.unswesg.comp9900h16aaabackend.model.dto.*;
import com.unswesg.comp9900h16aaabackend.service.FrameworkService;
import com.unswesg.comp9900h16aaabackend.service.IndicatorService;
import com.unswesg.comp9900h16aaabackend.service.SubElementService;
import com.unswesg.comp9900h16aaabackend.service.TertiaryElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.unswesg.comp9900h16aaabackend.common.CommonConstants.USER_LOGIN_STATE;

@Service
public class FrameworkServiceImpl implements FrameworkService{
    @Autowired
    private FrameworkMapper frameworkMapper;

    @Autowired
    private TertiaryElementService tertiaryElementService;

    @Autowired
    private SubElementService subElementService;

    @Autowired
    private IndicatorService indicatorService;

    @Autowired
    private ReportMapper reportMapper;

    @Override
    public Framework getFrameworkById(Integer id){
        return frameworkMapper.getFrameworkById(id);
    }
    @Override
    public List<SubElement> getSecondLevelElements(Integer id){
        return frameworkMapper.getSecondLevelElements(id);
    }

    @Override
    public FrameworkDTO getFrameworkTree(Integer id){
        Framework temp=frameworkMapper.getFrameworkById(id);
        if(temp==null) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework not found");

        Integer check= frameworkMapper.checkDiscard(id);
        if(check.equals(1)) throw new FrameworkException(ErrorCode.SYSTEM_ERROR,"Framework marked as discard");
        FrameworkDTO result= new FrameworkDTO();

        result.setFrameworkId(temp.getFrameworkId());
        result.setFrameworkName(temp.getFrameworkName());
        result.setUserId(temp.getUserId());
        ArrayList<SubElement> subElements=new ArrayList<SubElement>( frameworkMapper.getSecondLevelElements(id));
        for(SubElement i : subElements){
            SubElementDTO subEleBuffer= new SubElementDTO();
            subEleBuffer.setFrameworkId(i.getFrameworkId());
            subEleBuffer.setSubElementId(i.getSubElementId());
            subEleBuffer.setEleWeight(i.getEleWeight());
            subEleBuffer.setSubElementName(i.getSubElementName());
            ArrayList<TertiaryElement> tertiaryElements=new ArrayList<TertiaryElement>( subElementService.getTertiaryElements(i.getSubElementId()));
            for(TertiaryElement j: tertiaryElements){
                TertiaryElementDTO tertiaryEleBuffer = new TertiaryElementDTO();
                tertiaryEleBuffer.setEleWeight(j.getEleWeight());
                tertiaryEleBuffer.setTertiaryElementId(j.getTertiaryElementId());
                tertiaryEleBuffer.setTertiaryElementName(j.getTertiaryEelementName());
                tertiaryEleBuffer.setSubElementId(j.getSubElementId());
                ArrayList<Indicator> indicators= new ArrayList<Indicator>(tertiaryElementService.getIndicators(j.getTertiaryElementId()));
                for(Indicator z: indicators){
                    IndicatorDTO indicatorBuffer= new IndicatorDTO();
                    indicatorBuffer.setEleWeight(z.getEleWeight());
                    indicatorBuffer.setIndicatorName(z.getIndicatorName());
                    indicatorBuffer.setIndicatorId(z.getIndicatorId());
                    indicatorBuffer.setTertiaryElementId(z.getTertiaryElementId());
                    tertiaryEleBuffer.getIndicatorDTOList().add(indicatorBuffer);
                }
                subEleBuffer.getTertiaryElementDTOList().add(tertiaryEleBuffer);
            }
            result.getSubElementDTOList().add(subEleBuffer);

        }
        return result;
    }

    @Override
    @Transactional(rollbackFor = FrameworkException.class)
    public void insertFrameworkTree(FrameworkDTO frameworkDTO, Integer userId,String companyName,boolean edit){
        Objects.requireNonNull(frameworkDTO, "FrameworkDTO cannot be null!");
        Integer index= reportMapper.getTotalUserReportNumber(userId);
        index++;
        Framework frameworkBuffer=new Framework();
        if(frameworkDTO.getFrameworkId()!=null) {
            Framework checkFramework = frameworkMapper.getFrameworkById(frameworkDTO.getFrameworkId());
            if(checkFramework!=null && edit) {
                frameworkMapper.unboundFramework(checkFramework.getFrameworkId());
                frameworkBuffer.setFrameworkId(checkFramework.getFrameworkId());
            }
            else if(edit) throw new FrameworkException(ErrorCode.SYSTEM_ERROR,"A framework id is provided but no framework found");
        }
        frameworkBuffer.setFrameworkName(frameworkDTO.getFrameworkName());
        frameworkBuffer.setUserId(userId);
        frameworkMapper.insertFramework(frameworkBuffer);
        ArrayList<SubElementDTO> subElementDTOList= new ArrayList<SubElementDTO>(frameworkDTO.getSubElementDTOList());
        for(SubElementDTO i : subElementDTOList){
            SubElement subElementBuffer= new SubElement();
            subElementBuffer.setFrameworkId(frameworkBuffer.getFrameworkId());
            subElementBuffer.setEleWeight(i.getEleWeight());
            subElementBuffer.setSubElementName(i.getSubElementName());
            subElementService.insertSubElement(subElementBuffer);

            ArrayList<TertiaryElementDTO> tertiaryElementDTOList=new ArrayList<TertiaryElementDTO>(i.getTertiaryElementDTOList());
            for(TertiaryElementDTO j : tertiaryElementDTOList){
                TertiaryElement tertiaryElementBuffer= new TertiaryElement();
                tertiaryElementBuffer.setSubElementId(subElementBuffer.getSubElementId());
                tertiaryElementBuffer.setEleWeight(j.getEleWeight());
                tertiaryElementBuffer.setTertiaryEelementName(j.getTertiaryElementName());
                tertiaryElementService.insertTertiaryElement(tertiaryElementBuffer);
                ArrayList<IndicatorDTO> indicatorDTOList=new ArrayList<IndicatorDTO>(j.getIndicatorDTOList());
                for(IndicatorDTO z : indicatorDTOList){
                    Indicator indicatorBuffer=new Indicator();
                    indicatorBuffer.setTertiaryElementId(tertiaryElementBuffer.getTertiaryElementId());
                    indicatorBuffer.setIndicatorName(z.getIndicatorName());
                    indicatorBuffer.setEleWeight(z.getEleWeight());
                    indicatorService.insertIndicator(indicatorBuffer);
                    if(!StringUtils.isBlank(companyName)){
                        Report reportBuffer=new Report();
                        reportBuffer.setUserId(userId);
                        reportBuffer.setIndicatorId(indicatorBuffer.getIndicatorId());
                        reportBuffer.setIptValue(z.getIptValue()==null?0:z.getIptValue());
                        reportBuffer.setCompanyName(companyName);
                        reportBuffer.setFramework_id(frameworkBuffer.getFrameworkId());
                        reportBuffer.setReportId(index);
                        reportMapper.insertReport(reportBuffer);
                    }
                }
            }

        }


    }

    @Override
    @Transactional(rollbackFor = FrameworkException.class)
    public void applyFramework(FrameworkDTO framework,String companyName, Integer userId){
        Framework temp=frameworkMapper.getFrameworkById(framework.getFrameworkId());
        if(temp==null) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework not found" + ' '+framework);
        Integer check= frameworkMapper.checkDiscard(framework.getFrameworkId());
        if(check.equals(1)) throw new FrameworkException(ErrorCode.SYSTEM_ERROR,"Framework marked as discard");

        Integer index= reportMapper.getTotalUserReportNumber(userId);
        index++;

        if(!temp.getUserId().equals(userId) && !temp.getUserId().equals(1)) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework not found");
        if(!temp.getFrameworkName().equals(framework.getFrameworkName())) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on frameworkName");
        ArrayList<SubElementDTO> subElementDTOList= new ArrayList<SubElementDTO>(framework.getSubElementDTOList());
        for(SubElementDTO i : subElementDTOList){
            SubElement subReg= subElementService.getSubElementById(i.getSubElementId());
            if(subReg==null) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on SubElement");
            if(!subReg.getFrameworkId().equals(framework.getFrameworkId()) || !subReg.getFrameworkId().equals(i.getFrameworkId())) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on SubElementParentId");
            if(!subReg.getEleWeight().equals(i.getEleWeight())) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on SubElementWeight");
            if(!subReg.getSubElementName().equals(i.getSubElementName())) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on SubElementName");
            ArrayList<TertiaryElementDTO> tertiaryElementDTOList=new ArrayList<TertiaryElementDTO>(i.getTertiaryElementDTOList());
            for(TertiaryElementDTO j : tertiaryElementDTOList){
                TertiaryElement terReg=tertiaryElementService.getTertiaryElementById(j.getTertiaryElementId());
                if(terReg==null) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on TertiaryElement");
                if(!terReg.getEleWeight().equals(j.getEleWeight()) )throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on TertiaryElementWeight");
                if(!terReg.getSubElementId().equals(i.getSubElementId()) || !terReg.getSubElementId().equals(j.getSubElementId()))throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on TertiaryElementParentId");
                if(!terReg.getTertiaryEelementName().equals(j.getTertiaryElementName())) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on TertiaryElementName");
                ArrayList<IndicatorDTO> indicatorDTOList=new ArrayList<IndicatorDTO>(j.getIndicatorDTOList());
                for(IndicatorDTO z : indicatorDTOList){
                    if(!StringUtils.isBlank(companyName)){
                        Report reportBuffer=new Report();
                        reportBuffer.setUserId(userId);
                        Indicator reg=indicatorService.getIndicatorById(z.getIndicatorId());
                        if(reg==null) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on Indicator");
                        if(!reg.getTertiaryElementId().equals(j.getTertiaryElementId()) || !reg.getTertiaryElementId().equals(z.getTertiaryElementId())) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on IndicatorParentId");
                        if(!reg.getEleWeight().equals(z.getEleWeight()) ) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on IndicatorWeight");
                        if(!reg.getIndicatorName().equals(z.getIndicatorName())) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Framework does not match on IndicatorName");
                        reportBuffer.setIndicatorId(z.getIndicatorId());
                        reportBuffer.setIptValue(z.getIptValue()==null?0:z.getIptValue());
                        reportBuffer.setCompanyName(companyName);
                        reportBuffer.setFramework_id(framework.getFrameworkId());
                        reportBuffer.setReportId(index);
                        reportMapper.insertReport(reportBuffer);
                    }
                }
            }

        }

    }





    @Override
    public void unboundFramework(Integer frameworkId){
        frameworkMapper.unboundFramework(frameworkId);
    }

    @Override
    public List<Integer> getTargetFramework(){
        return frameworkMapper.getTargetFramework();
    }
    @Override
    public void insertFramework(Framework framework){
        frameworkMapper.insertFramework(framework);
    }
}
