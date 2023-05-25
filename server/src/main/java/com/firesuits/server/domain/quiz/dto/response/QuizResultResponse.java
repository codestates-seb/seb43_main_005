package com.firesuits.server.domain.quiz.dto.response;

import com.firesuits.server.domain.quiz.dto.QuizResultDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizResultResponse {
    private Long quizResultId;
    private Long contentId;
    private Long quizId;
    private Long memberId;
    private Boolean answer;
    private Boolean result;
    private String commentary;
    private int totalCount;
    private int correctCount;
    private int wrongCount;
    private Boolean checkPoint;


    public static QuizResultResponse from(QuizResultDto entity){
        return new QuizResultResponse(
                entity.getQuizResultId(),
                entity.getContent().getContentId(),
                entity.getMember().getMemberId(),
                entity.getQuiz().getQuizId(),
                entity.getAnswer(),
                entity.getResult(),
                entity.getQuiz().getCommentary(),
                entity.getTotalCount(),
                entity.getCorrectCount(),
                entity.getWrongCount(),
                entity.getCheckPoint()
        );
    }
}