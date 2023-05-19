package com.firesuits.server.domain.quiz.dto;

import com.firesuits.server.domain.content.dto.ContentDto;
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
    private Boolean answer;
    private Boolean result;
    private ContentDto content;
    private QuizDto quiz;
    private MemberDto member;
    private int totalCount;
    private int correctCount;
    private int wrongCount;

    public static QuizResultDto from(QuizResult entity){
        return new QuizResultDto(
                entity.getQuizResultId(),
                entity.getAnswer(),
                entity.getResult(),
                ContentDto.from(entity.getContent()),
                QuizDto.from(entity.getQuiz()),
                MemberDto.from(entity.getMember()),
                entity.getTotalCount(),
                entity.getCorrectCount(),
                entity.getWrongCount()
        );
    }
}