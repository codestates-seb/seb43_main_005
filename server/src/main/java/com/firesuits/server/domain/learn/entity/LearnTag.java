package com.firesuits.server.domain.learn.entity;

import com.firesuits.server.domain.content.entity.Content;
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
//태그가 코드스테이츠의 소제목과 동일
public class LearnTag extends AuditingFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long learnTagId;

    @Column(length = 30)
    private String name;

    @ManyToOne
    @JoinColumn(name = "learn_id")
    private Learn learn;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "content_Id")
    private Content contentBoard;

//    public static LearnTag of(Member member, Learn learn, String name){
//        LearnTag learnTag = new LearnTag();
//        learnTag.setMember(member);
//        learnTag.setLearn(learn);
//        learnTag.setName(name);
//        return learnTag;
//    }

    public static LearnTag of(Member member, Learn learn, String name, Content contentBoard){
        LearnTag learnTag = new LearnTag();
        learnTag.setMember(member);
        learnTag.setLearn(learn);
        learnTag.setName(name);
        learnTag.setContentBoard(contentBoard);
        return learnTag;
    }
}
