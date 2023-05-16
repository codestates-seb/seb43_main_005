package com.firesuits.server.domain.quiz.dto.response;

import com.firesuits.server.domain.content.dto.response.ContentResponse;
import com.firesuits.server.domain.member.dto.MemberDto;
import com.firesuits.server.domain.member.dto.response.MemberResponse;
import com.firesuits.server.domain.quiz.dto.QuizDto;
import com.firesuits.server.domain.quiz.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class QuizResponse {
    private Long quizId;
    private String content;
    private String example;
    private String commentary;
    private ContentResponse contentResponse;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static QuizResponse from(QuizDto entity){
        return new QuizResponse(
                entity.getQuizId(),
                entity.getDetail(),
                entity.getExample(),
                entity.getCommentary(),
                ContentResponse.from(entity.getContent()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
