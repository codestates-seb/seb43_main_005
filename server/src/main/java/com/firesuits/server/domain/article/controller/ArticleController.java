package com.firesuits.server.domain.article.controller;


import com.firesuits.server.domain.article.dto.ArticleDto;
import com.firesuits.server.domain.article.dto.request.ArticleCreateRequest;
import com.firesuits.server.domain.article.dto.request.ArticleUpdateRequest;
import com.firesuits.server.domain.article.dto.response.ArticleResponse;
import com.firesuits.server.domain.article.service.ArticleService;
import com.firesuits.server.global.error.response.Response;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        String bodyRemoveTag = Jsoup.clean(request.getContent(), Safelist.none());
        articleService.create(request.getTitle(), bodyRemoveTag, authentication.getName());
        return Response.success();
    }

    //수정
    @PatchMapping("/{articleId}")
    public Response<ArticleResponse> update(@PathVariable Long articleId,
                                            @RequestBody ArticleUpdateRequest request,
                                            Authentication authentication){
        String bodyRemoveTag = Jsoup.clean(request.getContent(), Safelist.none());
        ArticleDto articleDto = articleService.update(request.getTitle(), bodyRemoveTag, authentication.getName(), articleId);
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
    public Response<Page<ArticleResponse>> list(Pageable pageable){
        return Response.success(articleService.list(pageable).map(ArticleResponse::from));
    }

    //검색
    @GetMapping("/search")
    public Response<Page<ArticleResponse>> search(@RequestParam String keyword, Pageable pageable){
        return Response.success(articleService.search(keyword, pageable).map(ArticleResponse::from));
    }
}
