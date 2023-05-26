package com.firesuits.server.domain.learn.dto.response;

import com.firesuits.server.domain.learn.dto.LearnDto;
import lombok.AllArgsConstructor;
import lombok.Getter;



@AllArgsConstructor
@Getter
public class LearnResponse {
    private Long learnId;
    private String title;
    private String content;
    private Long contentId;

    public static LearnResponse from(LearnDto dto){
        return new LearnResponse(
                dto.getLearnId(),
                dto.getTitle(),
                dto.getContent(),
                dto.getContentBoard().getContentId()
        );
    }
}
