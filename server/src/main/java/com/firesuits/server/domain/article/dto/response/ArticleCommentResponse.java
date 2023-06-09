package com.firesuits.server.domain.article.dto.response;

import com.firesuits.server.domain.article.dto.ArticleCommentDto;
import com.firesuits.server.domain.member.dto.response.MemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class ArticleCommentResponse {
    private Long articleCommentId;
    private Long articleId;
    private String content;
    private int like;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private MemberResponse member;

    public static ArticleCommentResponse from(ArticleCommentDto dto){
        return new ArticleCommentResponse(
                dto.getArticleCommentId(),
                dto.getArticleId(),
                dto.getContent(),
                dto.getLike(),
                dto.getCreatedAt(),
                dto.getModifiedAt(),
                MemberResponse.from(dto.getMember())
        );
    }
}
