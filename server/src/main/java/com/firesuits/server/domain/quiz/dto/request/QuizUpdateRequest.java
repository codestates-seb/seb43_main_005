package com.firesuits.server.domain.quiz.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizUpdateRequest {
    private String detail;
    private String example;
    private String commentary;
    private boolean correct;
}