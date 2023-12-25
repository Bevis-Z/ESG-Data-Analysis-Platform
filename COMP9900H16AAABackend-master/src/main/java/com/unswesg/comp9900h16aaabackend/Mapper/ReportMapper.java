package com.unswesg.comp9900h16aaabackend.Mapper;

import com.unswesg.comp9900h16aaabackend.model.Report;

import java.util.List;

public interface ReportMapper {
    Integer getTotalUserReportNumber(Integer id);

    void insertReport(Report report);

    List<Report> getReportById(Integer userId,Integer reportId);
    List<Integer> getAllUserReportIndex(Integer userId);

}
