package com.firesuits.server.domain.content.dto.response;

import com.firesuits.server.domain.content.dto.ContentProgressDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ContentProgressResponse {
    private String title;
    private Double progress;

    public static ContentProgressResponse from(ContentProgressDto dto){
        return new ContentProgressResponse(
                dto.getContent().getTitle(),
                dto.getProgress()
        );
    }
}
