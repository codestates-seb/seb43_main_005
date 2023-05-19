package com.firesuits.server.domain.article.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ArticleUpdateRequest {
    private String title;
    private String content;
}
