package com.firesuits.server.domain.member.dto;

import com.firesuits.server.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MemberDto {
    private Long memberId;
    private String email;
    private String nickName;
    private String password;
    private int experience;
    private int level;
    private int requiredExperience;
    private String profileImage;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;


    public static MemberDto from(Member entity){
        return new MemberDto(
                entity.getMemberId(),
                entity.getEmail(),
                entity.getNickName(),
                entity.getPassword(),
                entity.getExperience(),
                entity.getLevel(),
                entity.getRequiredExperience(),
                entity.getProfileImage(),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
