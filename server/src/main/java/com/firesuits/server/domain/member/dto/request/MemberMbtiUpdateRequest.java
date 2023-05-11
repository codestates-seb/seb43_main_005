package com.firesuits.server.domain.member.dto.request;

import com.firesuits.server.domain.member.entity.MemberMbti;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MemberMbtiUpdateRequest {
    private MemberMbti memberMbti;
}
