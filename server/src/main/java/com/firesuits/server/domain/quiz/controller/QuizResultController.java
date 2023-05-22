package com.firesuits.server.domain.quiz.controller;

import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.quiz.dto.QuizResultDto;
import com.firesuits.server.domain.quiz.dto.request.QuizResultRequest;
import com.firesuits.server.domain.quiz.dto.response.QuizResultResponse;
import com.firesuits.server.domain.quiz.service.QuizResultService;
import com.firesuits.server.global.error.response.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contents/{content-id}/quizzes/{quiz-id}/quizresults")
public class QuizResultController {

    private QuizResultService quizResultService;

    public QuizResultController(QuizResultService quizResultService){
        this.quizResultService = quizResultService;
    }


    // content와 연결을 할지 고민해야 할듯
    @PostMapping
    public Response<Void> create(@PathVariable("content-id") Long contentId,
                                 @PathVariable("quiz-id") Long quizId,
                                @RequestBody QuizResultRequest request,
                                Authentication authentication){

        quizResultService.checkAnswer(quizId, contentId, request.isAnswer(), request.isResult(), authentication.getName());
        return Response.success();
    }

    @GetMapping("/{quizresult-id}")
    public Response<QuizResultResponse> get(@PathVariable("content-id") Long contentId,
                                            @PathVariable("quiz-id") Long quizId,
                                            @PathVariable("quizresult-id") Long quizResultId,
                                            Authentication authentication){
        QuizResultDto quizResultDto = quizResultService.findQuizResult(quizResultId , quizId, authentication.getName(), contentId);
        return Response.success(QuizResultResponse.from(quizResultDto));
    }

    @GetMapping
    public Response<Page<QuizResultResponse>> list(Pageable pageable, Authentication authentication){

        return Response.success(quizResultService.list(pageable, authentication.getName()).map(QuizResultResponse::from));
    }

/* 현재 동작하지 않음.
    @GetMapping
    public Response<Page<QuizResultResponse>> list(@PathVariable("content-id") Long contentId,
                                                    Authentication authentication,
                                                    Pageable pageable){
        return Response.success(quizResultService.finQuizTotalResult(contentId, authentication.getName(), pageable));
    }
    */
}
