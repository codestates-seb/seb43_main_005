package com.firesuits.server.domain.learn.entity;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.global.audit.AuditingFields;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Learn extends AuditingFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long learnId;
    private String title;
    @Column(columnDefinition = "TEXT", length = 20000)
    private String content;
    private boolean completed;
    private Integer experience;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // learn 보드의 content와 변수명이 똑같아서 수정
    @ManyToOne
    @JoinColumn(name = "content_Id")
    private Content contentBoard;

    public static Learn of(String title, String content, Member member, Content contentBoard){
        Learn learn = new Learn();
        learn.setTitle(title);
        learn.setContent(content);
        learn.setMember(member);
        learn.setContentBoard(contentBoard);
        return learn;
    }

}
