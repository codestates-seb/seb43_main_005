package com.firesuits.server.domain.article.entity;

import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.global.audit.AuditingFields;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class CommentLike extends AuditingFields {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long CommentLikeId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "article_comment_id")
    private ArticleComment articleComment;

    public static CommentLike of(Member member, ArticleComment articleComment){
        CommentLike entity = new CommentLike();
        entity.setMember(member);
        entity.setArticleComment(articleComment);
        return entity;
    }
}
