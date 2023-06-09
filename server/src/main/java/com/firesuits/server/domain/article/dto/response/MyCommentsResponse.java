package com.firesuits.server.domain.article.dto.response;

import com.firesuits.server.domain.article.dto.ArticleCommentDto;
import com.firesuits.server.domain.member.dto.response.MemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class MyCommentsResponse {
    private Long articleCommentId;
    private Long articleId;
    private String articleTitle;
    private String content;
    private Integer like;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private MemberResponse member;

    public static MyCommentsResponse from(ArticleCommentDto dto) {
        return new MyCommentsResponse(
                dto.getArticleCommentId(),
                dto.getArticleId(),
                dto.getArticleTitle(),
                dto.getContent(),
                dto.getLike(),
                dto.getCreatedAt(),
                dto.getModifiedAt(),
                MemberResponse.from(dto.getMember())
        );
    }
}
