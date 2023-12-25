package com.unswesg.comp9900h16aaabackend.service;

import com.unswesg.comp9900h16aaabackend.exception.LoginException;
import com.unswesg.comp9900h16aaabackend.model.User;
import com.unswesg.comp9900h16aaabackend.model.dto.UserDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class UserServiceTest {

    @Resource
    private UserService userService;

    @Test
    public void testAddUser() {
        User user = new User();
        user.setNickname("bowen12");
        user.setEmail("basd@gmail.com");


        boolean result = userService.save(user);
    }


    //make sure you have account with email "pantianyu0827@gmail.com" in users table, otherwise this should success
    @Test
    public void testInsertNewUser(){
        try {
            UserDTO tar = userService.registerUser("pantianyu0827@gmail.com", "猛男", "haha");
        }catch(LoginException e){
            Assertions.assertEquals(e.getMessage(),"Duplicate account");
        }

    }


}