package com.unswesg.comp9900h16aaabackend.service.impl;


import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.unswesg.comp9900h16aaabackend.Mapper.IndicatorMapper;
import com.unswesg.comp9900h16aaabackend.Mapper.ReportMapper;
import com.unswesg.comp9900h16aaabackend.common.ErrorCode;
import com.unswesg.comp9900h16aaabackend.exception.FrameworkException;
import com.unswesg.comp9900h16aaabackend.model.*;
import com.unswesg.comp9900h16aaabackend.model.dto.*;
import com.unswesg.comp9900h16aaabackend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportMapper reportMapper;

    @Autowired
    private IndicatorService indicatorService;

    @Autowired
    private TertiaryElementService tertiaryElementService;

    @Autowired
    private UserService userService;

    @Autowired
    private FrameworkService frameworkService;

    @Autowired
    private SubElementService subElementService;

    @Override
    public Integer getTotalUserReportNumber(Integer id){
        return reportMapper.getTotalUserReportNumber(id);
    }

    @Override
    public void insertReport(Report report){
        reportMapper.insertReport(report);
    }

    @Override
    public ReportDTO getReport(Integer userId, Integer reportId){
        ReportDTO result= new ReportDTO();
        ArrayList<Report> reportList= new ArrayList<Report>(reportMapper.getReportById(userId,reportId));
        ArrayList<TertiaryElementDTO> tertiaryElementDTOList= new ArrayList<TertiaryElementDTO>();
        ArrayList<SubElementDTO> subElementDTOList=new ArrayList<SubElementDTO>();
        FrameworkDTO frameworkDTO=new FrameworkDTO();
        for(Report i : reportList){
            if(StringUtils.isBlank(result.getCompanyName())) result.setCompanyName(i.getCompanyName());
            Indicator temp= indicatorService.getIndicatorById(i.getIndicatorId());
            IndicatorDTO indicatorDTOBuffer= new IndicatorDTO();
            indicatorDTOBuffer.setIndicatorId(temp.getIndicatorId());
            indicatorDTOBuffer.setIndicatorName(temp.getIndicatorName());
            indicatorDTOBuffer.setEleWeight(temp.getEleWeight());
            indicatorDTOBuffer.setIptValue(i.getIptValue());
            indicatorDTOBuffer.setScore(i.getIptValue()*temp.getEleWeight());
            indicatorDTOBuffer.setTertiaryElementId(temp.getTertiaryElementId());
            TertiaryElementDTO terTemp=checkInTertiaryList(tertiaryElementDTOList,indicatorDTOBuffer.getTertiaryElementId());
            if(terTemp==null){
                terTemp=new TertiaryElementDTO();
                TertiaryElement tertiaryElementBuffer=tertiaryElementService.getTertiaryElementById(indicatorDTOBuffer.getTertiaryElementId());
                terTemp.setTertiaryElementName(tertiaryElementBuffer.getTertiaryEelementName());
                terTemp.setEleWeight(tertiaryElementBuffer.getEleWeight());
                terTemp.setTertiaryElementId(tertiaryElementBuffer.getTertiaryElementId());
                terTemp.setSubElementId(tertiaryElementBuffer.getSubElementId());
                tertiaryElementDTOList.add(terTemp);
            }
            terTemp.getIndicatorDTOList().add(indicatorDTOBuffer);
        }
        for(TertiaryElementDTO i : tertiaryElementDTOList){
            SubElementDTO temp= checkInSubElementList(subElementDTOList,i.getSubElementId());
            getScoreForTertiaryElement(i);
            if(temp==null){
                temp=new SubElementDTO();
                SubElement subTemp=subElementService.getSubElementById(i.getSubElementId());
                temp.setSubElementName(subTemp.getSubElementName());
                temp.setFrameworkId(subTemp.getFrameworkId());
                temp.setEleWeight(subTemp.getEleWeight());
                temp.setSubElementId(subTemp.getSubElementId());
                subElementDTOList.add(temp);
            }
            temp.getTertiaryElementDTOList().add(i);
        }
        Integer frameworId=-1;
        for(SubElementDTO i : subElementDTOList){
            getScoreForSubElement(i);
            if(frameworId==-1) frameworId=i.getFrameworkId();
            else if(!frameworId.equals(i.getFrameworkId())) throw new FrameworkException(ErrorCode.SYSTEM_ERROR,"Something goes wrong");
        }
        Framework frameworkTemp= frameworkService.getFrameworkById(frameworId);
        frameworkDTO.setSubElementDTOList(subElementDTOList);
        frameworkDTO.setUserId(frameworkTemp.getUserId());
        frameworkDTO.setFrameworkName(frameworkTemp.getFrameworkName());
        frameworkDTO.setFrameworkId(frameworId);
        getScoreForFramework(frameworkDTO);
        result.setFrameworkDTO(frameworkDTO);
        result.setUserId(userId);
        return result;
    }


    @Override
    public List<ReportDTO> getAllUserReport(Integer userId){
        ArrayList<ReportDTO> result= new ArrayList<ReportDTO>();
        ArrayList<Integer> index=new ArrayList<Integer>(reportMapper.getAllUserReportIndex(userId));
        for(Integer i : index){
            result.add(this.getReport(userId,i));
        }
        return result;

    }

    private void getScoreForFramework(FrameworkDTO tar){
        tar.setScore(0.0);
        for(SubElementDTO i : tar.getSubElementDTOList()){
            tar.setScore(tar.getScore() + i.getScore());
        }

    }

    private void getScoreForTertiaryElement(TertiaryElementDTO tar){
        tar.setScore(0.0);
        for(IndicatorDTO i : tar.getIndicatorDTOList()){
            tar.setScore(tar.getScore() + i.getScore());
        }
        tar.setScore(tar.getScore() * tar.getEleWeight());
    }

    private void getScoreForSubElement(SubElementDTO tar){
        tar.setScore(0.0);
        for(TertiaryElementDTO i : tar.getTertiaryElementDTOList()){
            tar.setScore(tar.getScore() + i.getScore());
        }
        tar.setScore(tar.getScore() * tar.getEleWeight());
    }
    private TertiaryElementDTO checkInTertiaryList(ArrayList<TertiaryElementDTO> terList, Integer tar){
        for(TertiaryElementDTO i : terList){
            //System.out.println(i+"\n\n\n\n\n\n\n\n\n");
            if(i.getTertiaryElementId().equals(tar)) return i;
        }
        return null;
    }

    private SubElementDTO checkInSubElementList(ArrayList<SubElementDTO> terList, Integer tar){
        for(SubElementDTO i : terList){
            if(i.getSubElementId().equals(tar)) return i;
        }
        return null;
    }
}
