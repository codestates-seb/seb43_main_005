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
    private boolean completed;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private MemberResponse member;
    private ContentResponse contentBoard;
    public static LearnResponse from(LearnDto dto){
        return new LearnResponse(
                dto.getLearnId(),
                dto.getTitle(),
                dto.getContent(),
                dto.isCompleted(),
                dto.getCreateAt(),
                dto.getModifiedAt(),
                MemberResponse.from(dto.getMember()),
                ContentResponse.from(dto.getContentBoard())
        );
    }
}
