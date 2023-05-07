package com.firesuits.server.domain.article.repository;

import com.firesuits.server.domain.article.entity.Article;
import com.firesuits.server.domain.article.entity.ArticleComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCommentRepository extends JpaRepository<ArticleComment, Long> {
    Page<ArticleComment> findAllByArticle(Article article, Pageable pageable);
}
