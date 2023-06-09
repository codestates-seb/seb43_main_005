package com.firesuits.server.domain.quiz.controller;

import com.firesuits.server.domain.quiz.dto.QuizDto;
import com.firesuits.server.domain.quiz.dto.request.QuizCreateRequest;
import com.firesuits.server.domain.quiz.dto.request.QuizUpdateRequest;
import com.firesuits.server.domain.quiz.dto.response.QuizResponse;
import com.firesuits.server.domain.quiz.service.QuizService;
import com.firesuits.server.global.error.response.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

// 수정

@RestController
@RequestMapping("/contents/{content-id}")
public class QuizController {
    private QuizService quizService;

    public QuizController(QuizService quizService){
        this.quizService = quizService;
    }

    @PostMapping("/quizzes")
    public Response<Void> create(@PathVariable("content-id") Long contentId,
                                 @RequestBody QuizCreateRequest request,
                                 Authentication authentication){

        quizService.create(contentId, request.getDetail(), request.getExample(), request.getCommentary(), request.isCorrect(), authentication.getName());
        return Response.success();
    }

    @PatchMapping("/quizzes/{quiz-id}")
    public Response<QuizResponse> update(@PathVariable("content-id") Long contentId,
                                         @PathVariable("quiz-id") Long quizId,
                                         @RequestBody QuizUpdateRequest request, Authentication authentication){

        QuizDto quizDto = quizService.update(contentId, request.getDetail(), request.getExample(), request.getCommentary(), request.isCorrect(), authentication.getName(), quizId);
        return Response.success(QuizResponse.from(quizDto));
    }

    @DeleteMapping("/quizzes/{quiz-id}")
    public Response<Void> delete(@PathVariable("content-id") Long contentId,
                                 @PathVariable("quiz-id") Long quizId,
                                 Authentication authentication){
        quizService.delete(authentication.getName(), quizId ,contentId);
        return Response.success();
    }

    @GetMapping("/quizzes/{quiz-id}")
    public Response<QuizResponse> get(@PathVariable("content-id") Long contentId,
                                      @PathVariable("quiz-id") Long quizId,
                                      Authentication authentication){
        QuizDto quizDto = quizService.findByQuiz(quizId, contentId, authentication.getName());
        return Response.success(QuizResponse.from(quizDto));
    }

    @GetMapping("/quizzes")
    public Response<Page<QuizResponse>> list(
            Pageable pageable,
            @PathVariable("content-id") Long contentId){
        return Response.success(quizService.list(contentId, pageable).map(QuizResponse::from));
    }
}