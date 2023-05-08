package com.firesuits.server.domain.article.dto.response;

import com.firesuits.server.domain.article.dto.ArticleDto;
import com.firesuits.server.domain.member.dto.response.MemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class ArticleResponse {

    private Long articleId;
    private String title;
    private String content;
    private Integer view;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private MemberResponse member;

    public static ArticleResponse from(ArticleDto dto){
        return new ArticleResponse(
                dto.getArticleId(),
                dto.getTitle(),
                dto.getContent(),
                dto.getView(),
                dto.getCreateAt(),
                dto.getModifiedAt(),
                MemberResponse.from(dto.getMember()));
    }
}
