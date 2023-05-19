package com.firesuits.server.domain.article.dto;

import com.firesuits.server.domain.article.entity.ArticleComment;
import com.firesuits.server.domain.article.entity.CommentLike;
import com.firesuits.server.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ArticleCommentDto {
    private Long articleCommentId;
    private String content;
    private Long articleId;
    private String articleTitle;
    private Integer like;
    private MemberDto member;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ArticleCommentDto from(ArticleComment entity){
        return new ArticleCommentDto(
                entity.getArticleCommentId(),
                entity.getContent(),
                entity.getArticle().getArticleId(),
                entity.getArticle().getTitle(),
                entity.getCommentLikes().stream().mapToInt(CommentLike::getValue).sum(),
                MemberDto.from(entity.getMember()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
