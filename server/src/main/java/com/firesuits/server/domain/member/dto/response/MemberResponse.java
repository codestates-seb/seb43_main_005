package com.firesuits.server.domain.member.dto.response;

import com.firesuits.server.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponse {

    private Long memberId;
    private String email;
    private String nickName;
    private String profileImage;


    public static MemberResponse from(MemberDto dto){
        return new MemberResponse(
                dto.getMemberId(),
                dto.getEmail(),
                dto.getNickName(),
                dto.getProfileImage()
        );
    }
}
