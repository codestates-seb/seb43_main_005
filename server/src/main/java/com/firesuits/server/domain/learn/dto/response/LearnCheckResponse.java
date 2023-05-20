package com.firesuits.server.domain.learn.dto.response;

import com.firesuits.server.domain.content.dto.response.ContentProgressResponse;
import com.firesuits.server.domain.learn.dto.LearnCheckDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LearnCheckResponse {
    private Long learnCheckId;
    private Boolean completed;
    private ContentProgressResponse contentProgress;
    private Long learnId;
    private String title;

    public static LearnCheckResponse from(LearnCheckDto dto){
        return new LearnCheckResponse(
                dto.getLearnCheckId(),
                dto.getCompleted(),
                ContentProgressResponse.from(dto.getContentProgress()),
                dto.getLearn().getLearnId(),
                dto.getLearn().getTitle()
        );
    }

}
