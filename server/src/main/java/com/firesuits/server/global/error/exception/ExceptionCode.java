package com.firesuits.server.global.error.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    DUPLICATED_EMAIL(409, "이메일이 이미 존재"),
    MEMBER_EXISTS(409, "멤버가 이미 존재"),
    MEMBER_NOT_FOUND(404,"멤버를 찾을 수 없음"),
    ARTICLE_NOT_FOUND(404, "게시물을 찾을 수 없음"),
    COMMENT_NOT_FOUND(404, "댓글을 찾을 수 없음"),
    INVALID_REQUEST(400, "잘못된 요청"),
    INVALID_PERMISSION(403,"권한이 없습니다."),
    PASSWORD_MISMATCH(400, "새 비밀번호와 확인 비밀번호가 일치하지 않습니다."),
    WRONG_PASSWORD(400, "현재 비밀번호가 일치 하지 않습니다."),
    WRONG_CODE(400,"코드가 일치하지 않습니다."),
    INVALID_MBTI(400, "잘못된 결과값 입니다."),
    INVALID_THEME(400,"잘못된 결과값 입니다."),
    ALREADY_LIKED(409,"이미 좋아요를 눌렀습니다."),
    ALREADY_CHECKED_IN(409,"오늘은 이미 출석체크를 하였습니다."),
    INTERNAL_SERVER_ERROR(500, "내부 서버 오류"),
    CONTENT_NOT_FOUND(404,"컨텐츠를 찾을 수 없음"),
    QUIZ_NOT_FOUND(404,"퀴즈를 찾을 수 없음"),
    QUIZRESULT_NOT_FOUND(404, "퀴즈 결과를 찾을 수 없음"),
    QUIZRESULT_EXISTS(409, "퀴즈 결과가 이미 존재함"),
    LEARN_NOT_FOUND(404, "학습 내용을 찾을 수 없음"),
    CHECK_NOT_FOUND(404, "학습내용 현황을 찾을 수 없음"),
    CHECK_PROGRESS_NOT_FOUND(404, "진행률을 찾을 수 없음")
    ;
    private int status;
    private String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }
}
