package com.firesuits.server.domain.article.dto;

import com.firesuits.server.domain.article.entity.Article;
import com.firesuits.server.domain.article.entity.View;
import com.firesuits.server.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ArticleDto {
    private Long articleId;
    private String title;
    private String content;
    private int viewCount;
    private int commentCount;
    private MemberDto member;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    public static ArticleDto from(Article entity){
        return new ArticleDto(
                entity.getArticleId(),
                entity.getTitle(),
                entity.getContent(),
                entity.getViewCount(),
                entity.getCommentCount(),
                MemberDto.from(entity.getMember()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
