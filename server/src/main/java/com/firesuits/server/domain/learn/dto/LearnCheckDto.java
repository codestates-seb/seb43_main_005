package com.firesuits.server.domain.learn.dto;

import com.firesuits.server.domain.content.dto.ContentProgressDto;
import com.firesuits.server.domain.learn.entity.LearnCheck;
import com.firesuits.server.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class LearnCheckDto {
    private Long learnCheckId;
    private Boolean completed;
    private MemberDto member;
    private LearnDto learn;
    private ContentProgressDto contentProgressDto;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static LearnCheckDto from(LearnCheck entity){
        return new LearnCheckDto(
                entity.getLearnCheckId(),
                entity.getCompleted(),
                MemberDto.from(entity.getMember()),
                LearnDto.from(entity.getLearn()),
                ContentProgressDto.from(entity.getContentProgress()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
