package com.firesuits.server.domain.member.entity;

import com.firesuits.server.global.audit.AuditingFields;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends AuditingFields {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String email;
    private String nickName;
    private String password;
    private int experience;
    private int level;
    private int requiredExperience;
    private String profileImage;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public static Member of(String email, String nickName, String encodedPwd){
        Member entity = new Member();
        entity.setEmail(email);
        entity.setNickName(nickName);
        entity.setPassword(encodedPwd);
        return entity;
    }
}
