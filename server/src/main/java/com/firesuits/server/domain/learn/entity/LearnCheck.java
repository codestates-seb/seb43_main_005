package com.firesuits.server.domain.learn.entity;

import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.global.audit.AuditingFields;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class LearnCheck extends AuditingFields {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long LearnCheckId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "learn_id")
    private Learn learn;

    private boolean completed;

    public static LearnCheck of(Member member, Learn learn){
        LearnCheck learnCheck = new LearnCheck();
        learnCheck.setMember(member);
        learnCheck.setLearn(learn);
        learnCheck.setCompleted(false);
        return learnCheck;
    }
}
