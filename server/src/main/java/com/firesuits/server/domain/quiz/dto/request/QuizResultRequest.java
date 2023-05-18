package com.firesuits.server.domain.quiz.dto.request;

import com.firesuits.server.domain.quiz.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizResultRequest {
    private boolean answer;
    private boolean result;

}