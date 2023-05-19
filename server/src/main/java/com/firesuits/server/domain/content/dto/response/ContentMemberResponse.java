package com.firesuits.server.domain.content.dto.response;

import com.firesuits.server.domain.content.dto.ContentMemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ContentMemberResponse {
    private Long contentMemberId;
    private Long contentId;

    public static ContentMemberResponse from(ContentMemberDto dto){
        return new ContentMemberResponse(
                dto.getContentMemberId(),
                dto.getContentId()
        );
    }
}
