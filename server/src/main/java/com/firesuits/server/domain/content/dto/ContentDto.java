package com.firesuits.server.domain.content.dto;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ContentDto {

    private Long contentId;
    private String title;
    private String contentImg;
    private MemberDto member;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ContentDto from(Content entity){
        return new ContentDto(
                entity.getContentId(),
                entity.getTitle(),
                entity.getContentImg(),
                MemberDto.from(entity.getMember()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }

}
