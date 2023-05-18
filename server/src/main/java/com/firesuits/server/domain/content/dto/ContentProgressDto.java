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
    private Double progress;
    private LocalDateTime createdAt;

    public static ContentProgressDto from(ContentProgress entity){
        return new ContentProgressDto(
                entity.getContentProgressId(),
                MemberDto.from(entity.getMember()),
                ContentDto.from(entity.getContent()),
                entity.getProgress(),
                entity.getCreatedAt()
        );
    }
}
