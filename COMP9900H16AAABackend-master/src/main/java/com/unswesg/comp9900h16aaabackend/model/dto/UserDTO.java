package com.unswesg.comp9900h16aaabackend.model.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Integer userId;
    private String nickname;
    private String email;
    public UserDTO(Integer id,String nickname,String email){
        this.userId=id;
        this.nickname=nickname;
        this.email=email;
    }
}
