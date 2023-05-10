package com.firesuits.server.domain.member.dto.response;

import com.firesuits.server.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class MemberJoinResponse {
    private Long memberId;
    private String email;
    private String nickname;
    private String profileImage;
    private LocalDateTime createdAt;

    public static MemberJoinResponse from(MemberDto dto){
        return new MemberJoinResponse(
                dto.getMemberId(),
                dto.getEmail(),
                dto.getNickName(),
                dto.getProfileImage(),
                dto.getCreateAt()
        );
    }
}
