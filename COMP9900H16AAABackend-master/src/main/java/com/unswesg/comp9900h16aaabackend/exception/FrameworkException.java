package com.unswesg.comp9900h16aaabackend.exception;

import com.unswesg.comp9900h16aaabackend.common.ErrorCode;

public class FrameworkException extends RuntimeException{
    private final int code;

    public FrameworkException(int code, String message) {
        super(message);
        this.code = code;
    }

    public FrameworkException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.code = errorCode.getCode();
    }

    public FrameworkException(ErrorCode errorCode, String message) {
        super(message);
        this.code = errorCode.getCode();
    }

    public int getCode() {
        return code;
    }
}