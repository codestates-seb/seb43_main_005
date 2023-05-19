package com.firesuits.server.domain.learn.dto.response;

import com.firesuits.server.domain.content.dto.response.ContentResponse;
import com.firesuits.server.domain.learn.dto.LearnDto;
import com.firesuits.server.domain.member.dto.response.MemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

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
