package com.firesuits.server.domain.learn.dto.response;

import com.firesuits.server.domain.learn.dto.LearnTagDto;
import com.firesuits.server.domain.member.dto.response.MemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class LearnTagResponse {
    private Long learnTagId;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private MemberResponse member;
    private LearnResponse learn;

    public static LearnTagResponse from(LearnTagDto dto){
        return new LearnTagResponse(
                dto.getLearnTagId(),
                dto.getName(),
                dto.getCreatedAt(),
                dto.getModifiedAt(),
                MemberResponse.from(dto.getMember()),
                LearnResponse.from(dto.getLearn())
        );
    }
}
