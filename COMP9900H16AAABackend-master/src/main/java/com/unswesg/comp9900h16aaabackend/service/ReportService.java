package com.unswesg.comp9900h16aaabackend.service;

import com.unswesg.comp9900h16aaabackend.model.Report;
import com.unswesg.comp9900h16aaabackend.model.dto.ReportDTO;

import java.util.List;

public interface ReportService {
    Integer getTotalUserReportNumber(Integer id);
    void insertReport(Report report);

    ReportDTO getReport(Integer userId,Integer reportId);

    List<ReportDTO> getAllUserReport(Integer userId);

}
