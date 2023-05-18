package com.firesuits.server.domain.learn.controller;

import com.firesuits.server.domain.learn.dto.request.LearnCheckUpdateRequest;
import com.firesuits.server.domain.learn.service.LearnCheckService;
import com.firesuits.server.global.error.response.Response;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/learn-checks")
public class LearnCheckController {
    private final LearnCheckService learnCheckService;

    public LearnCheckController(LearnCheckService learnCheckService) {
        this.learnCheckService = learnCheckService;
    }

    @PatchMapping("/{learnCheckId}")
    public Response<Void> update(@PathVariable Long learnCheckId,
                                 @RequestBody LearnCheckUpdateRequest request,
                                 Authentication authentication){
        learnCheckService.updateLearnCheck(learnCheckId, authentication.getName(), request.getCompleted());
        return Response.success();
    }
}
