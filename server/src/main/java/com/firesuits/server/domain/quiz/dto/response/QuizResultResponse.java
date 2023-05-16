package com.firesuits.server.domain.quiz.dto.response;

import com.firesuits.server.domain.quiz.dto.QuizResultDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizResultResponse {
    private Long quizResultId;
    private Integer answer;
    private Boolean result;

    public static QuizResultResponse from(QuizResultDto entity){
        return new QuizResultResponse(
                entity.getQuizResultId(),
                entity.getAnswer(),
                entity.getResult()
        );
    }
}
