package com.firesuits.server.domain.quiz.dto;

import com.firesuits.server.domain.member.dto.MemberDto;
import com.firesuits.server.domain.quiz.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class QuizDto {

    // 퀴즈 등록
    private Long quizId;
    private String detail;
    private String example;
    private Boolean correct;
    private String commentary;
    private String result;
    private Integer experience;
    private MemberDto member;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static QuizDto from(Quiz entity){
        return new QuizDto(
                entity.getQuizId(),
                entity.getDetail(),
                entity.getExample(),
                entity.getCorrect(),
                entity.getCommentary(),
                entity.getResult(),
                entity.getExperience(),
                MemberDto.from(entity.getMember()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
