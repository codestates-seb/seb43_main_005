package com.firesuits.server.domain.member.dto.response;

import com.firesuits.server.domain.member.dto.MemberDto;
import com.firesuits.server.domain.member.entity.MemberMbti;
import com.firesuits.server.domain.member.entity.MemberTheme;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MemberDetailResponse {
    private Long memberId;
    private String email;
    private String nickName;
    private String profileImage;
    private MemberMbti memberMbti;
    private MemberTheme memberTheme;
    private int level;
    private int experience;
    private int requiredExperience;
    private LocalDateTime createAt;

    public static MemberDetailResponse from(MemberDto dto){
        return new MemberDetailResponse(
                dto.getMemberId(),
                dto.getEmail(),
                dto.getNickName(),
                dto.getProfileImage(),
                dto.getMemberMbti(),
                dto.getMemberTheme(),
                dto.getLevel(),
                dto.getExperience(),
                dto.getRequiredExperience(),
                dto.getCreateAt()
        );
    }
}
