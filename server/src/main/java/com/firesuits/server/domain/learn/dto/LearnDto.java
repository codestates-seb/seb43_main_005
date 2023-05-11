package com.firesuits.server.domain.learn.dto;

import com.firesuits.server.domain.content.dto.ContentDto;
import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class LearnDto {
    private Long learnId;
    private String title;
    private String content;
    private boolean completed;
    private Integer experience;
    private MemberDto member;
    private ContentDto contentBoard;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    public static LearnDto from(Learn entity){
        return new LearnDto(
                entity.getLearnId(),
                entity.getTitle(),
                entity.getContent(),
                entity.isCompleted(),
                entity.getExperience(),
                MemberDto.from(entity.getMember()),
                ContentDto.from(entity.getContentBoard()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
