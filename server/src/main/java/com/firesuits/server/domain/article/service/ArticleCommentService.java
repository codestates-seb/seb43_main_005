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
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

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
    @Transactional
    public void create(Long articleId, String email, String content){
        Article article = articleOrException(articleId);
        Member member = memberOrException(email);
        articleCommentRepository.save(ArticleComment.of(member, article, content));
    }

    //수정
    @Transactional
    public ArticleCommentDto update(String content, String email, Long articleId, Long articleCommentId){
        Member member = memberOrException(email);
        ArticleComment articleComment = commentOrException(articleCommentId);
        Article article = articleOrException(articleId);
        checkCommentMember(articleComment, member, email, articleCommentId);
        checkCommentArticle(articleComment, article, articleId, articleCommentId);
        articleComment.setContent(content);
        return ArticleCommentDto.from(articleCommentRepository.save(articleComment));
    }

    //삭제
    @Transactional
    public void delete(String email, Long articleId, Long articleCommentId){
        Member member = memberOrException(email);
        ArticleComment articleComment = commentOrException(articleCommentId);
        Article article = articleOrException(articleId);
        checkCommentMember(articleComment, member, email, articleCommentId);
        checkCommentArticle(articleComment, article, articleId, articleCommentId);
        articleCommentRepository.delete(articleComment);
    }

    //전체조회
    @Transactional(readOnly = true)
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

    private ArticleComment commentOrException(Long articleCommentId){
        return articleCommentRepository.findById(articleCommentId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND, String.format("%s 번의 댓글을 찾을 수 없습니다.", articleCommentId)));
    }

    private void checkCommentMember(ArticleComment articleComment, Member member, String email, Long articleCommentId){
        if (!Objects.equals(articleComment.getMember().getMemberId(), member.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 는 %s 댓글의 수정 권한을 가지고 있지 않습니다.", email, articleCommentId));
        }
    }

    private void checkCommentArticle(ArticleComment articleComment, Article article, Long articleId, Long articleCommentId){
        if (!Objects.equals(articleComment.getArticle().getArticleId(), article.getArticleId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST, String.format("%s 번의 질문에 대한 %s 번의 요청이 잘못 됐습니다.", articleId, articleCommentId));
        }
    }

}
