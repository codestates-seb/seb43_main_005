package com.firesuits.server.domain.content.dto.response;

import com.firesuits.server.domain.content.dto.ContentDto;
import com.firesuits.server.domain.member.dto.response.MemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class ContentResponse {
    private Long contentId;
    private String title;
    private String contentImg;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private MemberResponse member;

    public static ContentResponse from(ContentDto dto){
        return new ContentResponse(
                dto.getContentId(),
                dto.getTitle(),
                dto.getContentImg(),
                dto.getCreatedAt(),
                dto.getModifiedAt(),
                MemberResponse.from(dto.getMember())
        );
    }
}
