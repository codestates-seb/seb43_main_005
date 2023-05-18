package com.firesuits.server.domain.quiz.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizResultRequest {
    private boolean answer;
    private boolean result;
}
