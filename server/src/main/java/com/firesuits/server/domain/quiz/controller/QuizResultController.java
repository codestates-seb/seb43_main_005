package com.firesuits.server.domain.quiz.controller;

import com.firesuits.server.domain.quiz.dto.request.QuizResultRequest;
import com.firesuits.server.domain.quiz.service.QuizResultService;
import com.firesuits.server.global.error.response.Response;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quizzes/{quiz-id}/quizresults")
public class QuizResultController {

    private QuizResultService quizResultService;

    public QuizResultController(QuizResultService quizResultService){
        this.quizResultService = quizResultService;
    }

    @PostMapping
    public Response<Void> create(@PathVariable("quiz-id") Long quizId,
                                @RequestBody QuizResultRequest request,
                                Authentication authentication){
        quizResultService.checkAnswer(quizId, request.isAnswer(), request.isResult(), authentication.getName());
        return Response.success();
    }
}
