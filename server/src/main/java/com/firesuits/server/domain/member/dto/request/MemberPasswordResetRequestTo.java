package com.firesuits.server.domain.member.dto.request;

import com.firesuits.server.global.validation.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberPasswordResetRequestTo {
    private String token;
    @ValidPassword
    private String newPassword;
}
