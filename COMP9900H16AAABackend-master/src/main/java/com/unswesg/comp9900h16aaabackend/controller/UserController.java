package com.unswesg.comp9900h16aaabackend.controller;


import com.unswesg.comp9900h16aaabackend.common.BaseResponse;
import com.unswesg.comp9900h16aaabackend.common.ErrorCode;
import com.unswesg.comp9900h16aaabackend.exception.LoginException;
import com.unswesg.comp9900h16aaabackend.model.User;
import com.unswesg.comp9900h16aaabackend.model.dto.FrameworkDTO;
import com.unswesg.comp9900h16aaabackend.model.dto.UserDTO;
import com.unswesg.comp9900h16aaabackend.service.EmailService;
import com.unswesg.comp9900h16aaabackend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.util.List;

import static com.unswesg.comp9900h16aaabackend.common.CommonConstants.USER_LOGIN_STATE;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;
    @PostMapping("/register")
    public ResponseEntity<UserDTO> userRegister(@RequestBody User userRegisterRequest) {
        String email = userRegisterRequest.getEmail();
        String password = userRegisterRequest.getPassword();
        String nickname = userRegisterRequest.getNickname();
        UserDTO tar=userService.registerUser(email,nickname,password);
        return new ResponseEntity<UserDTO>(tar, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> userLogin(@RequestBody User userLoginRequest, HttpServletRequest request) {
        if (userLoginRequest == null) {
            throw new LoginException(ErrorCode.PARAMS_ERROR);
        }
        String email = userLoginRequest.getEmail();
        String password = userLoginRequest.getPassword();
        UserDTO tar = userService.loginUser(email, password, request);
        return new ResponseEntity<UserDTO>(tar, HttpStatus.OK);
    }

    @GetMapping("/get/login")
    public ResponseEntity<UserDTO> getLoginUser(HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        return new ResponseEntity<UserDTO>(tar, HttpStatus.OK);
    }

    @GetMapping("/get/userDefinedFramework")
    public ResponseEntity<List<FrameworkDTO>> getUserDefinedFramework(HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        return new ResponseEntity<List<FrameworkDTO>>(userService.getUserFrameworks(tar.getUserId()), HttpStatus.OK);
    }

    @GetMapping("/get/defaultFramework")
    public ResponseEntity<List<FrameworkDTO>> getDefaultFramework(HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        return new ResponseEntity<List<FrameworkDTO>>(userService.getUserFrameworks(1), HttpStatus.OK);
    }

    @PostMapping("/deleteFramework")
    public HttpStatus deleteFramework(HttpServletRequest request,@RequestParam Integer frameworkId){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        userService.unboundFramework(frameworkId);
        return HttpStatus.OK;
    }

    @PostMapping("/sendVerificationCode")
    public HttpStatus verifyEmail(HttpServletRequest request,@RequestParam String email){
        emailService.sendMessage(request,email);
        return HttpStatus.OK;
    }

    @PostMapping("/verifyCode")
    public ResponseEntity<String> verifyCode(HttpServletRequest request,@RequestParam String code,@RequestParam String email,@RequestParam String newPassword){
        boolean result=emailService.checkVerificationCode(request,code);
        if(result) {
            userService.changePassword(email,newPassword);
            return new ResponseEntity<String>("Verification passed",HttpStatus.OK);
        }
        return new ResponseEntity<String>("Verification failed",HttpStatus.BAD_REQUEST);
    }



    @PostMapping("/verifyUser")
    public ResponseEntity<Boolean> verifyUser(HttpServletRequest request,@RequestParam String password){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        if(userService.verifyUser(tar.getEmail(),password)) return new ResponseEntity<Boolean>(true,HttpStatus.OK);
        return new ResponseEntity<Boolean>(false,HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/updatePassword")
    public HttpStatus updatePassword(HttpServletRequest request,@RequestParam String newPassword){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO tar = (UserDTO) userObj;
        if(tar == null) throw new LoginException(ErrorCode.NOT_LOGIN_ERROR,"Login required");
        userService.changePassword(tar.getEmail(),newPassword);
        return HttpStatus.OK;
    }
}
