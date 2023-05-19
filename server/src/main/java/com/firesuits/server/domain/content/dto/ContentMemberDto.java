package com.firesuits.server.domain.content.dto;

import com.firesuits.server.domain.content.entity.ContentMember;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ContentMemberDto {

    private Long contentMemberId;
    private Long contentId;


    public static ContentMemberDto from(ContentMember entity) {
        return new ContentMemberDto(
                entity.getContentMemberId(),
                entity.getContent().getContentId()
        );
    }
}
