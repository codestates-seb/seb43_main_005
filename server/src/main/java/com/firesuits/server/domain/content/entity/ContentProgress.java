package com.firesuits.server.domain.content.entity;

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
public class ContentProgress extends AuditingFields {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentProgressId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    private double progress;

    public static ContentProgress of(Member member, Content content){
        ContentProgress contentProgress = new ContentProgress();
        contentProgress.setMember(member);
        contentProgress.setContent(content);
        contentProgress.setProgress(0.0);
        return contentProgress;
    }

    public void updateProgress(double progress){
        this.progress = progress;
    }
}