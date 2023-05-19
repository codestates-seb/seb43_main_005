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
public class QuizTotalResultDto {


    private Long totalCount;
    private int correctCount;
    private Long wrongCount;
    private ContentDto content;
    private QuizDto quiz;
    private MemberDto member;

    public static QuizTotalResultDto from(QuizResult entity){
        return new QuizTotalResultDto(

                entity.getTotalCount(),
                entity.getCorrectCount(),
                entity.getWrongCount(),
                ContentDto.from(entity.getContent()),
                QuizDto.from(entity.getQuiz()),
                MemberDto.from(entity.getMember())
        );
    }
}
