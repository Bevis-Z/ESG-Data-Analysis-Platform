package com.unswesg.comp9900h16aaabackend.service.impl;

import com.unswesg.comp9900h16aaabackend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.math.BigInteger;
import java.security.SecureRandom;


@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender emailSender;
    @Override
    public void sendMessage(HttpServletRequest request, String to){
        String code = codeGenerator();
        MimeMessagePreparator preparator = new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
                mimeMessage.setFrom(new InternetAddress("pantianyu0827@163.com"));

                mimeMessage.setText("Your verification code is:\n" + code);
            }
        };
        try{
            emailSender.send(preparator);
            request.getSession().setAttribute("VERIFICATION_CODE",code);

        }catch (MailException e) {
            System.err.println(e.getMessage());

        }
    }
    @Override
    public boolean checkVerificationCode(HttpServletRequest request,String code){


        return code.equals((String) request.getSession().getAttribute("VERIFICATION_CODE"));
    }

    private String codeGenerator(){
        SecureRandom random = new SecureRandom();
        return new BigInteger(30, random).toString(32).toUpperCase();
    }
}
