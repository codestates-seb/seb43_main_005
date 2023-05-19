package com.firesuits.server.domain.article.entity;

import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.global.audit.AuditingFields;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class ArticleComment extends AuditingFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleCommentId;

    @Column(columnDefinition = "TEXT", length = 5000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(optional = false)
    @JoinColumn(name = "article_id")
    private Article article;

    @OneToMany(mappedBy = "articleComment", cascade = CascadeType.ALL)
    private List<CommentLike> commentLikes = new ArrayList<>();

    public static ArticleComment of(Member member, Article article, String content){
        ArticleComment articleComment = new ArticleComment();
        articleComment.setMember(member);
        articleComment.setArticle(article);
        articleComment.setContent(content);
        return articleComment;
    }
}
