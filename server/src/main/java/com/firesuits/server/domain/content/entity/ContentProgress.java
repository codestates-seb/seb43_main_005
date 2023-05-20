package com.firesuits.server.domain.content.entity;

import com.firesuits.server.domain.learn.entity.LearnCheck;
import com.firesuits.server.domain.member.entity.Member;
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
public class ContentProgress extends AuditingFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentProgressId;

    private double progress;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @OneToMany(mappedBy = "contentProgress", cascade = CascadeType.ALL)
    private List<LearnCheck> learnChecks = new ArrayList<>();

    public static ContentProgress of(Member member, Content content){
        ContentProgress contentProgress = new ContentProgress();
        contentProgress.setMember(member);
        contentProgress.setContent(content);
        contentProgress.setProgress(0.0);
        return contentProgress;
    }
}
