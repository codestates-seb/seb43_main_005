package com.firesuits.server.domain.quiz.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizCreateRequest {

    private String detail;
    private String example;
    private Boolean correct;
    private String commentary;
    private String result;
    private Integer experience;
}
