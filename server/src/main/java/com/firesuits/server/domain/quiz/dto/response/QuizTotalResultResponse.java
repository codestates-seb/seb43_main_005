package com.firesuits.server.domain.quiz.dto.response;

import com.firesuits.server.domain.quiz.dto.QuizResultDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuizTotalResultResponse {
    // 퀴즈 합계만을 위한 Response
    private String contentTitle;
    private Long quizId;
    private Long memberId;
    private int totalCount;
    private int correctCount;
    private int wrongCount;

    public static QuizTotalResultResponse from(QuizResultDto entity){
        return new QuizTotalResultResponse(
                entity.getContent().getTitle(),
                entity.getQuiz().getQuizId(),
                entity.getMember().getMemberId(),
                entity.getTotalCount(),
                entity.getCorrectCount(),
                entity.getWrongCount()
        );
    }
}
