package com.firesuits.server.domain.article.service;

import com.firesuits.server.domain.article.dto.ArticleDto;
import com.firesuits.server.domain.article.entity.Article;
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
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;

    public ArticleService(ArticleRepository articleRepository, MemberRepository memberRepository) {
        this.articleRepository = articleRepository;
        this.memberRepository = memberRepository;
    }

    // 생성
    @Transactional
    public void create(String title, String content, String email){
        Member member = memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 을 찾을 수 없습니다.", email)));

        articleRepository.save(Article.of(title, content, member));
    }

    //수정
    @Transactional
    public ArticleDto update(String title, String content, String email, Long articleId){
        Member member = memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 을 찾을 수 없습니다.", email)));
        Article article = articleRepository.findById(articleId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND, String.format("%s 을 찾을 수 없습니다.", articleId)));
        if (article.getMember() != member){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 는 %s 의 권한이 없습ㄴ디ㅏ.", email,articleId));
        }
        article.setTitle(title);
        article.setContent(content);
        return ArticleDto.from(articleRepository.save(article));
    }


    //삭제
    public void delete(String email, Long articleId){
        Member member = memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 을 찾을 수 없습니다.", email)));
        Article article = articleRepository.findById(articleId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND, String.format("%s 을 찾을 수 없습니다.", articleId)));

        if (!Objects.equals(article.getMember().getMemberId(), member.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 는 %s 의 권한이 없습니다.", email, articleId));
        }
        articleRepository.delete(article);
    }

    //전체 조회
    public Page<ArticleDto> list(Pageable pageable){
        return articleRepository.findAll(pageable).map(ArticleDto::from);
    }

}
