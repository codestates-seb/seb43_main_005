package com.firesuits.server.domain.quiz.dto.response;

import com.firesuits.server.domain.content.dto.response.ContentResponse;
import com.firesuits.server.domain.member.dto.response.MemberResponse;
import com.firesuits.server.domain.quiz.dto.QuizResultDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizResultResponse {
    private Long quizResultId;
    private Boolean answer;
    private Boolean result;
    private ContentResponse contentResponse;
    private QuizResponse quizResponse;
    private MemberResponse memberResponse;
    private int correctCount;


    public static QuizResultResponse from(QuizResultDto entity){
        return new QuizResultResponse(
                entity.getQuizResultId(),
                entity.getAnswer(),
                entity.getResult(),
                ContentResponse.from(entity.getContent()),
                QuizResponse.from(entity.getQuiz()),
                MemberResponse.from(entity.getMember()),
                entity.getCorrectCount()
        );
    }
}