package com.unswesg.comp9900h16aaabackend.model.dto;


import lombok.Data;

@Data
public class ReportDTO {

    private String companyName;
    private Integer userId;
    private FrameworkDTO frameworkDTO;

}
