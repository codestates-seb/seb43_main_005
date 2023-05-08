package com.firesuits.server.domain.article.service;

import com.firesuits.server.domain.article.dto.ArticleDto;
import com.firesuits.server.domain.article.entity.Article;
import com.firesuits.server.domain.article.entity.View;
import com.firesuits.server.domain.article.repository.ArticleRepository;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
        Member member = memberOrException(email);
        articleRepository.save(Article.of(title, content, member));
    }

    //수정
    @Transactional
    public ArticleDto update(String title, String content, String email, Long articleId){
        Member member = memberOrException(email);
        Article article = articleOrException(articleId);
        checkArticleMember(article, member, email, articleId);
        article.setTitle(title);
        article.setContent(content);
        return ArticleDto.from(articleRepository.save(article));
    }

    //삭제
    public void delete(String email, Long articleId){
        Member member = memberOrException(email);
        Article article = articleOrException(articleId);
        checkArticleMember(article, member, email, articleId);
        articleRepository.delete(article);
    }

    //단건 조회
    @Transactional
    public ArticleDto findById(Long articleId){
        Article article = articleOrException(articleId);
        List<View> views = article.getViews();
        if (views.isEmpty()) {
            views.add(new View(article, 1));
        } else {
            View lastView = views.get(views.size() - 1);
            lastView.setViewCount(lastView.getViewCount() + 1);
        }
        return ArticleDto.from(article);
    }

    //전체 조회
    @Transactional(readOnly = true)
    public Page<ArticleDto> list(Pageable pageable){
        return articleRepository.findAll(pageable).map(ArticleDto::from);
    }

    //검색 리스트
    @Transactional(readOnly = true)
    public Page<ArticleDto> search(String keyword, Pageable pageable){
        return articleRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable).map(ArticleDto::from);
    }

    private Member memberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow( () ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }
    private Article articleOrException(Long articleId){
        return articleRepository.findById(articleId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND, String.format("%s 번의 게시물이 존재 하지 않습니다.", articleId)));
    }

    private void checkArticleMember(Article article, Member member, String email, Long articleId) {
        if (!Objects.equals(article.getMember().getMemberId(), member.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 는 %s 의 권한이 없습니다.", email, articleId));
        }
    }
}
