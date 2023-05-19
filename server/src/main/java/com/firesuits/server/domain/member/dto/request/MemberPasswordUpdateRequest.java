package com.firesuits.server.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberPasswordUpdateRequest {
    private String currentPassword;
    private String newPassword;
    private String checkNewPassword;
}
