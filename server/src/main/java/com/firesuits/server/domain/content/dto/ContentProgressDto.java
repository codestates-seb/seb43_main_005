package com.firesuits.server.domain.content.dto;

import com.firesuits.server.domain.content.entity.ContentProgress;
import com.firesuits.server.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ContentProgressDto {

    private Long contentProgressId;
    private MemberDto member;
    private ContentDto content;
    private int progress;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ContentProgressDto from(ContentProgress entity){
        return new ContentProgressDto(
                entity.getContentProgressId(),
                MemberDto.from(entity.getMember()),
                ContentDto.from(entity.getContent()),
                (int) Math.round(entity.getProgress()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }

}
