package com.firesuits.server.domain.content.dto.response;

import com.firesuits.server.domain.content.dto.ContentProgressDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ContentProgressResponse {
    private Long contentProgressId;
    private Double progress;
    private Long contentId;
    private String title;
    private String ContentImg;

    public static ContentProgressResponse from(ContentProgressDto dto){
        return new ContentProgressResponse(
                dto.getContentProgressId(),
                dto.getProgress(),
                dto.getContent().getContentId(),
                dto.getContent().getTitle(),
                dto.getContent().getContentImg()
        );
    }
}
