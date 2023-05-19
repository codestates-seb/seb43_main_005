package com.firesuits.server.domain.quiz.dto;

import com.firesuits.server.domain.member.dto.MemberDto;
import com.firesuits.server.domain.quiz.entity.QuizResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class QuizResultDto {

    private Long quizResultId;
    private boolean answer;
    private boolean result;
    private Integer trueAnswer;
    private Integer falseAnswer;
    private QuizDto quiz;
    private MemberDto member;

    public static QuizResultDto from(QuizResult entity){
        return new QuizResultDto(
                entity.getQuizResultId(),
                entity.isAnswer(),
                entity.isResult(),
                entity.getTrueAnswer(),
                entity.getFalseAnswer(),
                QuizDto.from(entity.getQuiz()),
                MemberDto.from(entity.getMember())
        );
    }
}