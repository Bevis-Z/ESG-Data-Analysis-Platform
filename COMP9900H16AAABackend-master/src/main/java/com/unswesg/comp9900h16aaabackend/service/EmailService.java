package com.unswesg.comp9900h16aaabackend.service;

import javax.servlet.http.HttpServletRequest;

public interface EmailService {

    void sendMessage(HttpServletRequest request, String to);
    boolean checkVerificationCode(HttpServletRequest request,String code);
}
