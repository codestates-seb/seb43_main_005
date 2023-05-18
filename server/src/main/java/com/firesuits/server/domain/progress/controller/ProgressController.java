package com.firesuits.server.domain.progress.controller;

import com.firesuits.server.domain.progress.service.ProgressService;
import com.firesuits.server.global.error.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/contents")
public class ProgressController {
    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @PostMapping("/{contentId}/learns/{learnId}/progress")
    public Response<Void> create(@PathVariable Long contentId,
                                 @PathVariable Long learnId, Authentication authentication){
        progressService.createLearn(authentication.getName(), contentId, learnId);
        return Response.success();
    }
}
