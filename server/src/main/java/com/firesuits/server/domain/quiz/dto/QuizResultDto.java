package com.firesuits.server.domain.quiz.dto;

import com.firesuits.server.domain.quiz.entity.QuizResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class QuizResultDto {

    private Long quizResultId;
    private Integer answer;
    private Boolean result;

    public static QuizResultDto from(QuizResult entity){
        return new QuizResultDto(
                entity.getQuizResultId(),
                entity.getAnswer(),
                entity.getResult()
        );
    }
}
