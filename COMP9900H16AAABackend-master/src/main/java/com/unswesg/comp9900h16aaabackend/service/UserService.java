package com.unswesg.comp9900h16aaabackend.service;

import com.unswesg.comp9900h16aaabackend.model.User;
import com.baomidou.mybatisplus.extension.service.IService;
import com.unswesg.comp9900h16aaabackend.model.dto.FrameworkDTO;
import com.unswesg.comp9900h16aaabackend.model.dto.UserDTO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
* @author mac
* @description 针对表【user】的数据库操作Service
* @createDate 2023-09-29 14:46:08
*/
public interface UserService extends IService<User> {
    UserDTO loginUser(String email,String password, HttpServletRequest request);
    UserDTO registerUser(String email, String nickname, String password);

    List<FrameworkDTO> getUserFrameworks(Integer id);

    void unboundFramework(Integer frameworkId);

    void  changePassword(String email,String newPassword);
    boolean verifyUser(String email,String password);

    boolean verifyNewPassword(String email,String newPassword);
}
