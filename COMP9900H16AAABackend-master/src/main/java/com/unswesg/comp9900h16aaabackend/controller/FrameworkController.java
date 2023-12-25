package com.unswesg.comp9900h16aaabackend.controller;


import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.unswesg.comp9900h16aaabackend.common.ErrorCode;
import com.unswesg.comp9900h16aaabackend.exception.FrameworkException;
import com.unswesg.comp9900h16aaabackend.exception.LoginException;
import com.unswesg.comp9900h16aaabackend.model.dto.FrameworkDTO;
import com.unswesg.comp9900h16aaabackend.model.dto.ReportDTO;
import com.unswesg.comp9900h16aaabackend.model.dto.UserDTO;
import com.unswesg.comp9900h16aaabackend.service.FrameworkService;
import com.unswesg.comp9900h16aaabackend.service.ReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.util.List;

import static com.unswesg.comp9900h16aaabackend.common.CommonConstants.USER_LOGIN_STATE;

@RestController
@RequestMapping("/framework")
@Slf4j
public class FrameworkController {

    @Autowired
    private FrameworkService frameworkService;

    @Autowired
    private ReportService reportService;

    @GetMapping("/get")
    public ResponseEntity<FrameworkDTO> getFrameworkById(@RequestParam Integer id){
        return new ResponseEntity<FrameworkDTO>(frameworkService.getFrameworkTree(id), HttpStatus.OK);
    }

    @PostMapping("/insert")
    public void insertFrameworkTree(HttpServletRequest request,@RequestBody FrameworkDTO frameworkDTO) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        frameworkService.insertFrameworkTree(frameworkDTO,tar.getUserId(),"",false);
    }

    @PostMapping("/insert/report")
    public void insertFrameworkReport(HttpServletRequest request,@RequestBody FrameworkDTO frameworkDTO,@RequestParam String companyName) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        if(StringUtils.isBlank(companyName)) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Empty company name");
        frameworkService.insertFrameworkTree(frameworkDTO,tar.getUserId(),companyName,false);
    }

    @PostMapping("/edit")
    public void editFramework(HttpServletRequest request,@RequestBody FrameworkDTO frameworkDTO) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        frameworkService.insertFrameworkTree(frameworkDTO,tar.getUserId(),"",true);
    }
    @PostMapping("/edit/apply")
    public void editAndApplyFramework(HttpServletRequest request,@RequestBody FrameworkDTO frameworkDTO,@RequestParam String companyName) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        if(StringUtils.isBlank(companyName)) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Empty company name");
        frameworkService.insertFrameworkTree(frameworkDTO,tar.getUserId(),companyName,true);
    }
    @PostMapping("/apply")
    public void applyFrameworkReport(HttpServletRequest request,@RequestBody FrameworkDTO frameworkDTO,@RequestParam String companyName) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        if(StringUtils.isBlank(companyName)) throw new FrameworkException(ErrorCode.PARAMS_ERROR,"Empty company name");
        frameworkService.applyFramework(frameworkDTO,companyName,tar.getUserId());
    }

    @GetMapping("/get/report")
    public ResponseEntity<ReportDTO> getReportById(HttpServletRequest request,@RequestParam Integer reportId){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        return new ResponseEntity<ReportDTO>(reportService.getReport(tar.getUserId(),reportId), HttpStatus.OK);
    }
    @GetMapping("/get/all/report")
    public ResponseEntity<List<ReportDTO>> getFrameworkById(HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        return new ResponseEntity<List<ReportDTO>>(reportService.getAllUserReport(tar.getUserId()), HttpStatus.OK);
    }






}
