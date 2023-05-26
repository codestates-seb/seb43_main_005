package com.firesuits.server.domain.member.dto.request;

import com.firesuits.server.global.validation.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberPasswordUpdateRequest {
    private String currentPassword;
    @ValidPassword
    private String newPassword;
    private String checkNewPassword;
}
