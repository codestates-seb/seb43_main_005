package com.firesuits.server.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberPasswordResetRequest {
    @Email
    private String email;
}
