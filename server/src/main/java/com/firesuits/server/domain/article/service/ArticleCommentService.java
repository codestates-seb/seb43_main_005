package com.firesuits.server.domain.article.service;

import com.firesuits.server.domain.article.dto.ArticleCommentDto;
import com.firesuits.server.domain.article.entity.Article;
import com.firesuits.server.domain.article.entity.ArticleComment;
import com.firesuits.server.domain.article.repository.ArticleCommentRepository;
import com.firesuits.server.domain.article.repository.ArticleRepository;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ArticleCommentService {

    private final ArticleRepository articleRepository;
    private final ArticleCommentRepository articleCommentRepository;
    private final MemberRepository memberRepository;

    public ArticleCommentService(ArticleRepository articleRepository, ArticleCommentRepository articleCommentRepository, MemberRepository memberRepository) {
        this.articleRepository = articleRepository;
        this.articleCommentRepository = articleCommentRepository;
        this.memberRepository = memberRepository;
    }

    //생성
    public void create(Long articleId, String email, String content){
        Article article = articleOrException(articleId);
        Member member = memberOrException(email);
        articleCommentRepository.save(ArticleComment.of(member, article, content));
    }

    //전체조회
    public Page<ArticleCommentDto> list(Long articleId, Pageable pageable){
        Article article = articleOrException(articleId);
        return articleCommentRepository.findAllByArticle(article, pageable).map(ArticleCommentDto::from);
    }



    private Article articleOrException(Long articleId){
        return articleRepository.findById(articleId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND, String.format("%s 번의 게시글을 찾을수 없습니다.", articleId)));
    }

    private Member memberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 멤버를 찾을 수 없습니다.", email)));
    }
}
