package com.firesuits.server.domain.quiz.dto.response;

import com.firesuits.server.domain.quiz.dto.QuizResultDto;
import com.firesuits.server.domain.quiz.dto.QuizTotalResultDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizTotalResultResponse {
    // 퀴즈 합계만을 위한 Response
    private Long contentId;
    private Long memberId;
    private Long quizId;
    private Long totalCount;
    private int correctCount;
    private Long wrongCount;

    public static QuizTotalResultResponse from(QuizTotalResultDto entity){
        return new QuizTotalResultResponse(
                entity.getContent().getContentId(),
                entity.getQuiz().getQuizId(),
                entity.getMember().getMemberId(),
                entity.getTotalCount(),
                entity.getCorrectCount(),
                entity.getWrongCount()
        );
    }
}
