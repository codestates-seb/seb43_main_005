package com.firesuits.server.domain.article.repository;

import com.firesuits.server.domain.article.entity.Article;
import com.firesuits.server.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findAllByMember(Member member, Pageable pageable);
}
