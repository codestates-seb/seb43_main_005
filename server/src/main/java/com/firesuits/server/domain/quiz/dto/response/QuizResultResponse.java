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
    private QuizResponse quizResponse;
    private MemberResponse memberResponse;


    public static QuizResultResponse from(QuizResultDto entity){
        return new QuizResultResponse(
                entity.getQuizResultId(),
                entity.isAnswer(),
                entity.isResult(),
                QuizResponse.from(entity.getQuiz()),
                MemberResponse.from(entity.getMember())
        );
    }
}
