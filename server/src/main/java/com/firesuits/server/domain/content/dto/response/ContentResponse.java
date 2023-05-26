package com.firesuits.server.domain.content.dto.response;

import com.firesuits.server.domain.content.dto.ContentDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ContentResponse {
    private Long contentId;
    private String title;
    private String contentImg;

    public static ContentResponse from(ContentDto dto){
        return new ContentResponse(
                dto.getContentId(),
                dto.getTitle(),
                dto.getContentImg()
        );
    }
}
