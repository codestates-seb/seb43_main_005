package com.firesuits.server.domain.content.controller;

import com.firesuits.server.domain.content.dto.ContentDto;
import com.firesuits.server.domain.content.dto.ContentProgressDto;
import com.firesuits.server.domain.content.dto.request.ContentRequest;
import com.firesuits.server.domain.content.dto.response.ContentProgressResponse;
import com.firesuits.server.domain.content.dto.response.ContentResponse;
import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.content.service.ContentProgressService;
import com.firesuits.server.domain.content.service.ContentService;
import com.firesuits.server.global.error.response.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/contents")
public class ContentController {
    private final ContentService contentService;
    private final ContentProgressService contentProgressService;

    public ContentController(ContentService contentService, ContentProgressService contentProgressService) {
        this.contentService = contentService;
        this.contentProgressService = contentProgressService;
    }

    @PostMapping
    public Response<Void> create(@RequestBody ContentRequest request, Authentication authentication){
        contentService.create(request.getTitle(), request.getContentImg(),authentication.getName());

        return Response.success();
    }

    @PatchMapping("/{content-id}")
    public Response<ContentResponse> update(@PathVariable("content-id") Long contentId,
                                       @RequestBody ContentRequest request, Authentication authentication){
        ContentDto contentDto = contentService.update(request.getTitle(), request.getContentImg(), authentication.getName(), contentId);
        return Response.success(ContentResponse.from(contentDto));
    }

    @DeleteMapping("/{content-id}")
    public Response<Void> delete(@PathVariable("content-id") Long contentId, Authentication authentication){
        contentService.delete(authentication.getName(), contentId);
        return Response.success();
    }

    @GetMapping("/{content-id}")
    public Response<ContentResponse> get(@PathVariable("content-id") Long contentId){
        ContentDto contentDto = contentService.findById(contentId);
        return Response.success(ContentResponse.from(contentDto));
    }

    @GetMapping
    public Response<Page<ContentResponse>> list(Pageable pageable){
        return Response.success(contentService.list(pageable).map(ContentResponse::from));
    }

    //조회 버튼을 선택하여 LearnCheck 와 contentProgress 생성
    @GetMapping("/{contentId}/access")
    public Response<Void> accessContent(@PathVariable Long contentId, Authentication authentication){
        Content content = contentService.accessContent(contentId, authentication.getName());
        return Response.success();
    }
    //진짜 contentProgress 전체 조회
    @GetMapping("/progress")
    public Response<Page<ContentProgressResponse>> listProgress(Authentication authentication, Pageable pageable){
        return Response.success(contentProgressService.listContentProgress(authentication.getName(),pageable).map(ContentProgressResponse::from));
    }

    //진짜 contentProgress 조회
    @GetMapping("/{contentId}/progress")
    public Response<ContentProgressResponse> getProgress(@PathVariable Long contentId, Authentication authentication){
        ContentProgressDto contentProgressDto = contentProgressService.getContentProgress(contentId, authentication.getName());
        return Response.success(ContentProgressResponse.from(contentProgressDto));
    }
}

