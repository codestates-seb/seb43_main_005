package com.firesuits.server.domain.article.controller;

import com.firesuits.server.domain.article.service.CommentLikeService;
import com.firesuits.server.global.error.response.Response;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/articleComment")
public class CommentLikeController {

    private final CommentLikeService commentLikeService;

    public CommentLikeController(CommentLikeService commentLikeService) {
        this.commentLikeService = commentLikeService;
    }

    //좋아요
    @PostMapping("/{articleCommentId}/likes")
    public Response<Void> like(@PathVariable Long articleCommentId, Authentication authentication){
        commentLikeService.like(articleCommentId, authentication.getName());
        return Response.success();
    }

    //좋아요 리스트
    @GetMapping("/{articleCommentId}/likes")
    public Response<Long> likeCount(@PathVariable Long articleCommentId){
        return Response.success(commentLikeService.likeCount(articleCommentId));
    }

}
