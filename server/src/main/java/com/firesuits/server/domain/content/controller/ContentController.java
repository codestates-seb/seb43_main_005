package com.firesuits.server.domain.content.controller;

import com.firesuits.server.domain.content.dto.ContentDto;
import com.firesuits.server.domain.content.dto.request.ContentCreateRequest;
import com.firesuits.server.domain.content.dto.request.ContentUpdateRequest;
import com.firesuits.server.domain.content.dto.response.ContentResponse;
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

    public ContentController(ContentService contentService){
        this.contentService = contentService;
    }

    @PostMapping
    public Response<Void> create(@RequestBody ContentCreateRequest request, Authentication authentication){
        contentService.create(request.getTitle(), request.getContentImg(), authentication.getName());
        return Response.success();
    }

    @PatchMapping("/{content-id}")
    public Response<ContentResponse> update(@PathVariable("content-id") Long contentId,
                                       @RequestBody ContentUpdateRequest request, Authentication authentication){
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


}
