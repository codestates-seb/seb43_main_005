package com.firesuits.server.domain.article.controller;


import com.firesuits.server.domain.article.dto.ArticleDto;
import com.firesuits.server.domain.article.dto.request.ArticleCreateRequest;
import com.firesuits.server.domain.article.dto.request.ArticleUpdateRequest;
import com.firesuits.server.domain.article.dto.response.ArticleResponse;
import com.firesuits.server.domain.article.service.ArticleService;
import com.firesuits.server.global.error.response.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/article")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    //생성
    @PostMapping
    public Response<Void> create(@RequestBody ArticleCreateRequest request, Authentication authentication){
        articleService.create(request.getTitle(), request.getContent(), authentication.getName());
        return Response.success();
    }

    //수정
    @PatchMapping("/{articleId}")
    public Response<ArticleResponse> update(@PathVariable Long articleId,
                                            @RequestBody ArticleUpdateRequest request,
                                            Authentication authentication){
        ArticleDto articleDto = articleService.update(request.getTitle(), request.getContent(), authentication.getName(), articleId);
        return Response.success(ArticleResponse.from(articleDto));
    }

    //삭제
    @DeleteMapping("/{articleId}")
    public Response<Void> delete(@PathVariable Long articleId, Authentication authentication){
        articleService.delete(authentication.getName(), articleId);
        return Response.success();
    }

    //단건 조회
    @GetMapping("/{articleId}")
    public Response<ArticleResponse> get(@PathVariable Long articleId){
        ArticleDto articleDto = articleService.findById(articleId);
        return Response.success(ArticleResponse.from(articleDto));
    }

    //전체 조회
    @GetMapping
    public Response<Page<ArticleResponse>> list(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(name = "sort", required = false) String sort){
        return Response.success(articleService.list(pageable, sort).map(ArticleResponse::from));
    }

    //검색
    @GetMapping("/search")
    public Response<Page<ArticleResponse>> search(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam String keyword){
        return Response.success(articleService.search(keyword, pageable).map(ArticleResponse::from));
    }
}
