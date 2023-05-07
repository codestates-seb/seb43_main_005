package com.firesuits.server.domain.article.entity;


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
public class Article extends AuditingFields {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleId;

    @Column(columnDefinition = "TEXT", length = 20000)
    private String title;
    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public static Article of(String title, String content, Member member){
        Article article = new Article();
        article.setTitle(title);
        article.setContent(content);
        article.setMember(member);
        return article;
    }
}
