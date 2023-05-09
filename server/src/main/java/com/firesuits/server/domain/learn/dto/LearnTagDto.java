package com.firesuits.server.domain.learn.dto;

import com.firesuits.server.domain.learn.entity.LearnTag;
import com.firesuits.server.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class LearnTagDto {
    private Long learnTagId;
    private String name;
    private long learnId;
    private MemberDto member;
    private LearnDto learn;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static LearnTagDto from(LearnTag entity){
        return new LearnTagDto(
                entity.getLearnTagId(),
                entity.getName(),
                entity.getLearn().getLearnId(),
                MemberDto.from(entity.getMember()),
                LearnDto.from(entity.getLearn()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
