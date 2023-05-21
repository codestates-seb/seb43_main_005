package com.firesuits.server.domain.content.dto.response;

import com.firesuits.server.domain.content.dto.ContentProgressDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ContentProgressResponse {
    private Long contentProgressId;
    private Double progress;
    private ContentResponse content;

    public static ContentProgressResponse from(ContentProgressDto dto){
        return new ContentProgressResponse(
                dto.getContentProgressId(),
                dto.getProgress(),
                ContentResponse.from(dto.getContent())
        );
    }
}
