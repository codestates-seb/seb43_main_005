package com.firesuits.server.domain.learn.controller;

import com.firesuits.server.domain.learn.dto.request.LearnTagRequest;
import com.firesuits.server.domain.learn.dto.response.LearnTagResponse;
import com.firesuits.server.domain.learn.service.LearnTagService;
import com.firesuits.server.global.error.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@Slf4j
@RequestMapping("/contents")
public class LearnTagController {
    private LearnTagService learnTagService;

    public LearnTagController(LearnTagService learnTagService) {
        this.learnTagService = learnTagService;
    }

    @PostMapping("/{contentId}/learns/{learnId}/learnTags")
    public Response<Void> create(@PathVariable Long contentId,
                                 @PathVariable Long learnId,
                                 @RequestBody LearnTagRequest request, Authentication authentication){
        learnTagService.create(request.getName(), learnId,contentId, authentication.getName());
        return Response.success();
    }
}
