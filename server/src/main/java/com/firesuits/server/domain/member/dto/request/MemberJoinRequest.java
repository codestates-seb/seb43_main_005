package com.firesuits.server.domain.member.dto.request;


import com.firesuits.server.domain.member.entity.MemberMbti;
import com.firesuits.server.global.validation.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
public class MemberJoinRequest {
    @Email
    private String email;
    @NotBlank
    private String nickname;
    @ValidPassword
    private String password;
    private String checkPassword;
    private MemberMbti memberMbti;
}
