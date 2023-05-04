package com.firesuits.server.global.error.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    DUPLICATED_EMAIL(409, "이메일을 찾을 수 없음"),
    MEMBER_EXISTS(409, "이메일이 이미 존재"),
    MEMBER_NOT_FOUND(404,"멤버를 찾을 수 없음"),
    INTERNAL_SERVER_ERROR(500, "내부 서버 오류"),
    ;
    private int status;
    private String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }
}
