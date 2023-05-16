package com.firesuits.server.domain.quiz.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizResultResponse {
    private Long quizResultId;
    private Long answer;
    private Boolean result;
}
