package com.firesuits.server.domain.article.controller;

import com.firesuits.server.domain.article.dto.ArticleCommentDto;
import com.firesuits.server.domain.article.dto.request.ArticleCommentRequest;
import com.firesuits.server.domain.article.dto.response.ArticleCommentResponse;
import com.firesuits.server.domain.article.service.ArticleCommentService;
import com.firesuits.server.global.error.response.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public Response<Void> create(@PathVariable Long articleId,
                                 @RequestBody ArticleCommentRequest request,
                                 Authentication authentication){
        articleCommentService.create(articleId, authentication.getName(), request.getContent());
        return Response.success();
    }

    //수정
    @PatchMapping("/{articleId}/articleComments/{articleCommentId}")
    public Response<ArticleCommentResponse> update(@PathVariable Long articleId,
                                                   @PathVariable Long articleCommentId,
                                                   @RequestBody ArticleCommentRequest request,
                                                   Authentication authentication){
        ArticleCommentDto articleCommentDto = articleCommentService.update(request.getContent(), authentication.getName(), articleId, articleCommentId);
        return Response.success(ArticleCommentResponse.from(articleCommentDto));
    }

    //삭제
    @DeleteMapping("/{articleId}/articleComments/{articleCommentId}")
    public Response<Void> delete(@PathVariable Long articleId,
                                 @PathVariable Long articleCommentId,
                                 Authentication authentication){
        articleCommentService.delete(authentication.getName(), articleId, articleCommentId);
        return Response.success();
    }

    //전체 조회
    @GetMapping("/{articleId}/articleComments")
    public Response<Page<ArticleCommentResponse>> get(
            @PageableDefault(sort = "createdBy", direction = Sort.Direction.ASC) Pageable pageable,
            @PathVariable Long articleId,
            @RequestParam(name = "sort", required = false) String sort){
        return Response.success(articleCommentService.list(articleId, pageable, sort).map(ArticleCommentResponse::from));
    }
}
