package com.unswesg.comp9900h16aaabackend.exception;

import com.unswesg.comp9900h16aaabackend.common.ErrorCode;

public class LoginException extends RuntimeException {

    /**
     * 错误码
     */
    private final int code;

    public LoginException(int code, String message) {
        super(message);
        this.code = code;
    }

    public LoginException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.code = errorCode.getCode();
    }

    public LoginException(ErrorCode errorCode, String message) {
        super(message);
        this.code = errorCode.getCode();
    }

    public int getCode() {
        return code;
    }
}