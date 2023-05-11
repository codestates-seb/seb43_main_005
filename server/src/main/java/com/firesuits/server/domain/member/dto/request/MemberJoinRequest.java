package com.firesuits.server.domain.member.dto.request;


import com.firesuits.server.domain.member.entity.MemberMbti;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberJoinRequest {
    private String email;
    private String nickname;
    private String password;
    private MemberMbti memberMbti;
}
