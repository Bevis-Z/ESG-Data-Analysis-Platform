package com.unswesg.comp9900h16aaabackend.Mapper;

import com.unswesg.comp9900h16aaabackend.model.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.unswesg.comp9900h16aaabackend.model.dto.UserDTO;

import java.util.List;

/**
* @author mac
* @description 针对表【user】的数据库操作Mapper
* @createDate 2023-09-29 14:46:08
* @Entity com.unswesg.comp9900h16aaabackend.model.User
*/
public interface UserMapper extends BaseMapper<User> {
    UserDTO getUserInfo(String email, String password);
    Integer getUserCount(String email);

    List<Integer> getUserFrameworks(Integer id);

    void insertNewUser(User tar);

    void changePassword(String email,String newPassword);

    String getUserPassword(String email);
}




