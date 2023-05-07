package com.firesuits.server.domain.article.controller;

import com.firesuits.server.domain.article.dto.request.ArticleCommentRequest;
import com.firesuits.server.domain.article.dto.response.ArticleCommentResponse;
import com.firesuits.server.domain.article.service.ArticleCommentService;
import com.firesuits.server.global.error.response.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/article")
public class ArticleCommentController {

    private final ArticleCommentService articleCommentService;

    public ArticleCommentController(ArticleCommentService articleCommentService) {
        this.articleCommentService = articleCommentService;
    }

    //생성
    @PostMapping("/{articleId}/articleComments")
    public Response<Void> create(@PathVariable Long articleId, @RequestBody ArticleCommentRequest request, Authentication authentication){
        articleCommentService.create(articleId, authentication.getName(), request.getContent());
        return Response.success();
    }

    //전체 조회
    @GetMapping("/{articleId}/articleComments")
    public Response<Page<ArticleCommentResponse>> get(Pageable pageable, @PathVariable Long articleId){
        return Response.success(articleCommentService.list(articleId, pageable).map(ArticleCommentResponse::from));
    }

    
}
