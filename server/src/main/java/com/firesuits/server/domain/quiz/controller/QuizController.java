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
        quizService.delete(authentication.getName(), quizId);
        return Response.success();
    }

    @GetMapping("/quizzes/{quiz-id}")
    public Response<QuizResponse> get(@PathVariable("quiz-id") Long quizId,
                                      @PathVariable("content-id") Long contentId){
        QuizDto quizDto = quizService.findById(quizId);
        return Response.success(QuizResponse.from(quizDto));
    }

    @GetMapping("/quizzes")
    public Response<Page<QuizResponse>> list(Pageable pageable){
        return Response.success(quizService.list(pageable).map(QuizResponse::from));
    }
}