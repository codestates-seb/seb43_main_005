package com.firesuits.server.domain.learn.controller;

import com.firesuits.server.domain.learn.dto.LearnCheckDto;
import com.firesuits.server.domain.learn.dto.request.LearnCheckRequest;
import com.firesuits.server.domain.learn.dto.response.LearnCheckResponse;
import com.firesuits.server.domain.learn.service.LearnCheckService;
import com.firesuits.server.global.error.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@Slf4j
@RequestMapping("/contents")
public class LearnCheckController {
    private final LearnCheckService learnCheckService;

    public LearnCheckController(LearnCheckService learnCheckService) {
        this.learnCheckService = learnCheckService;
    }

    @PatchMapping("/{contentId}/learns/{learnId}/learnChecks/{learnCheckId}")
    public Response<Void> update(@PathVariable Long contentId,
                                 @PathVariable Long learnId,
                                 @PathVariable Long learnCheckId,
                                 @RequestBody LearnCheckRequest request, Authentication authentication) {
        learnCheckService.updateLearnCheck(request.getCompleted(), authentication.getName(), contentId, learnId, learnCheckId);

        return Response.success();
    }

    @GetMapping("/{contentId}/learns/{learnId}/learnChecks/{learnCheckId}")
    public Response<LearnCheckResponse> get(@PathVariable Long contentId,
                                            @PathVariable Long learnId,
                                            @PathVariable Long learnCheckId, Authentication authentication) {
        LearnCheckDto learnCheckDto = learnCheckService.findById(contentId, learnId, learnCheckId, authentication.getName());

        return Response.success(LearnCheckResponse.from(learnCheckDto));
    }

    @GetMapping("/{contentId}/learns/learnChecks")
    public Response<Page<LearnCheckResponse>> list(@PathVariable Long contentId,
                                                   Authentication authentication, Pageable pageable ){
        return Response.success(learnCheckService.list(contentId, authentication.getName(), pageable).map(LearnCheckResponse::from));
    }
}
