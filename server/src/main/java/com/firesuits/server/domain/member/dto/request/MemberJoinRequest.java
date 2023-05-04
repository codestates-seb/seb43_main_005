package com.firesuits.server.domain.member.dto.request;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberJoinRequest {
    private String email;
    private String nickname;
    private String password;
}
