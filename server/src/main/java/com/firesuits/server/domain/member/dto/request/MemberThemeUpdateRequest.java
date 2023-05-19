package com.firesuits.server.domain.member.dto.request;

import com.firesuits.server.domain.member.entity.MemberTheme;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MemberThemeUpdateRequest {
    private MemberTheme memberTheme;
}
