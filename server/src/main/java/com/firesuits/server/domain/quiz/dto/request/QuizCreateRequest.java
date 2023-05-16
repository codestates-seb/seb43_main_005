package com.firesuits.server.domain.quiz.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizCreateRequest {

    private String detail;
    private String example;
    private String commentary;

}
