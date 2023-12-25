package com.unswesg.comp9900h16aaabackend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.unswesg.comp9900h16aaabackend.common.ErrorCode;
import com.unswesg.comp9900h16aaabackend.exception.LoginException;
import com.unswesg.comp9900h16aaabackend.model.User;
import com.unswesg.comp9900h16aaabackend.model.dto.FrameworkDTO;
import com.unswesg.comp9900h16aaabackend.model.dto.UserDTO;
import com.unswesg.comp9900h16aaabackend.service.FrameworkService;
import com.unswesg.comp9900h16aaabackend.service.UserService;
import com.unswesg.comp9900h16aaabackend.Mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;

import static com.unswesg.comp9900h16aaabackend.common.CommonConstants.USER_LOGIN_STATE;

/**
* @author mac
* @description 针对表【user】的数据库操作Service实现
* @createDate 2023-09-29 14:46:08
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService{
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private FrameworkService frameworkService;

    private final String regex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
    @Override
    public UserDTO loginUser(String email,String password, HttpServletRequest request){

        if (email == null || password == null) {
            throw new LoginException(ErrorCode.PARAMS_ERROR, "Empty params");
        }
        if (!email.matches(regex)) {
            throw new LoginException(ErrorCode.PARAMS_ERROR, "Invalid email");
        }
        if (email.length() < 8) {
            throw new LoginException(ErrorCode.PARAMS_ERROR, "Wrong password");
        }

        UserDTO tar = userMapper.getUserInfo(email,password);
        if(tar!=null)request.getSession().setAttribute(USER_LOGIN_STATE, tar);
        else throw new LoginException(ErrorCode.SYSTEM_ERROR, "User not found");
        return tar;
    }

    @Override
    public UserDTO registerUser(String email,String nickname,String password){
        if (email == null || password == null) {
            throw new LoginException(ErrorCode.PARAMS_ERROR, "Empty params");
        }
        if (!email.matches(regex)) {
            throw new LoginException(ErrorCode.PARAMS_ERROR, "Invalid email");
        }
        synchronized (email.intern()){
            Integer count= userMapper.getUserCount(email);
            if(count>0) throw new LoginException(ErrorCode.PARAMS_ERROR, "Duplicate account");
            User tar= new User();
            tar.setNickname(nickname);
            tar.setEmail(email);
            tar.setPassword(password);

            userMapper.insertNewUser(tar);
            return new UserDTO(tar.getUserId(),tar.getNickname(),tar.getEmail());
        }
    }

    @Override
    public List<FrameworkDTO> getUserFrameworks(Integer id){
        ArrayList<Integer> userFrameworks= new ArrayList<>(userMapper.getUserFrameworks(id));
        ArrayList<FrameworkDTO> result= new ArrayList<FrameworkDTO>();
        for(Integer i : userFrameworks){
            result.add(frameworkService.getFrameworkTree(i));
        }
        return result;
    }

    @Override
    public void unboundFramework(Integer frameworkId){
        frameworkService.unboundFramework(frameworkId);
    }


    @Override
    public boolean verifyUser(String email,String password){
        UserDTO tar = userMapper.getUserInfo(email,password);
        return tar != null;
    }

    @Override
    public boolean verifyNewPassword(String email,String newPassword){
        String temp=userMapper.getUserPassword(email);
        if(temp==null) throw new LoginException(ErrorCode.SYSTEM_ERROR,"User not found");
        return newPassword.equals(temp);
    }

    @Override
    public synchronized void changePassword(String email,String newPassword){
        if(verifyNewPassword(email,newPassword)) throw new LoginException(ErrorCode.PARAMS_ERROR,"New password cannot the same as old password");

        userMapper.changePassword(email,newPassword);
    }

}




