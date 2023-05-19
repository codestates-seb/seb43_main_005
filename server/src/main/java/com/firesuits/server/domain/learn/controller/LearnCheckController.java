package com.firesuits.server.domain.learn.controller;

import com.firesuits.server.domain.learn.dto.request.LearnCheckRequest;
import com.firesuits.server.domain.learn.service.LearnCheckService;
import com.firesuits.server.global.error.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@Slf4j
@RequestMapping("/learn-checks")
public class LearnCheckController {
    private final LearnCheckService learnCheckService;

    public LearnCheckController(LearnCheckService learnCheckService) {
        this.learnCheckService = learnCheckService;
    }

    @PatchMapping("/{learnCheckId}")
    public Response<Void> update(@PathVariable Long learnCheckId,
                                 @RequestBody LearnCheckRequest request, Authentication authentication){
        learnCheckService.updateLearnCheck(request.getCompleted(), authentication.getName(), learnCheckId);
        return Response.success();
    }
}
