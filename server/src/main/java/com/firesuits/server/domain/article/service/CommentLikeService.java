package com.firesuits.server.domain.article.service;

import com.firesuits.server.domain.article.entity.ArticleComment;
import com.firesuits.server.domain.article.entity.CommentLike;
import com.firesuits.server.domain.article.repository.ArticleCommentRepository;
import com.firesuits.server.domain.article.repository.CommentLikeRepository;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentLikeService {

    private final MemberRepository memberRepository;
    private final ArticleCommentRepository articleCommentRepository;
    private final CommentLikeRepository commentLikeRepository;

    public CommentLikeService(MemberRepository memberRepository, ArticleCommentRepository articleCommentRepository, CommentLikeRepository commentLikeRepository) {
        this.memberRepository = memberRepository;
        this.articleCommentRepository = articleCommentRepository;
        this.commentLikeRepository = commentLikeRepository;
    }

    //좋아요
    @Transactional
    public void like(Long articleCommentId, String email){
        Member member = memberOrException(email);
        ArticleComment articleComment = articleCommentOrException(articleCommentId);
        commentLikeRepository.findByMemberAndArticleComment(member, articleComment).ifPresent(it -> {
            throw new BusinessLogicException(ExceptionCode.ALREADY_LIKED, String.format("%s 는 이미 %s 댓글의 좋아요를 눌렀습니다.", email, articleCommentId));
        });
        commentLikeRepository.save(CommentLike.of(member, articleComment, 1));
    }

    //TODO: 성능개선 방법검토
    //좋아요 리스트
    @Transactional
    public Long likeCount(Long articleCommentId){
        ArticleComment articleComment = articleCommentOrException(articleCommentId);
        return commentLikeRepository.countByArticleComment(articleComment, 1);
    }

    private ArticleComment articleCommentOrException(Long articleCommentId){
        return articleCommentRepository.findById(articleCommentId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND, String.format("%s 번의 댓글을 찾을 수 없습니다.", articleCommentId)));
    }

    private Member memberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 가진 멤버를 찾을 수 없습니다.", email)));
    }
}
