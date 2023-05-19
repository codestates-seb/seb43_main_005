package com.firesuits.server.domain.learn.entity;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.global.audit.AuditingFields;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class LearnCheck extends AuditingFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long learnCheckId;
    private boolean completed;
    @ManyToOne
    @JoinColumn(name = "member_Id")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "learn_Id")
    private Learn learn;

    public static LearnCheck of(Learn learn, Member member){
        LearnCheck learnCheck = new LearnCheck();
        learnCheck.setMember(member);
        learnCheck.setLearn(learn);
        learnCheck.setCompleted(false);
        return learnCheck;
    }
}
