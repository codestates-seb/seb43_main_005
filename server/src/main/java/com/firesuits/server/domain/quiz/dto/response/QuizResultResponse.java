package com.firesuits.server.domain.quiz.dto.response;

import com.firesuits.server.domain.member.dto.response.MemberResponse;
import com.firesuits.server.domain.quiz.dto.QuizResultDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizResultResponse {
    private Long quizResultId;
    private boolean answer;
    private boolean result;
    private Integer trueAnswer;
    private Integer falseAnswer;
    private QuizResponse quizResponse;
    private MemberResponse memberResponse;


    public static QuizResultResponse from(QuizResultDto entity){
        return new QuizResultResponse(
                entity.getQuizResultId(),
                entity.isAnswer(),
                entity.isResult(),
                entity.getTrueAnswer(),
                entity.getFalseAnswer(),
                QuizResponse.from(entity.getQuiz()),
                MemberResponse.from(entity.getMember())
        );
    }
}