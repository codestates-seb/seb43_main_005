package com.firesuits.server.domain.quiz.repository;

import com.firesuits.server.domain.article.entity.Article;
import com.firesuits.server.domain.article.entity.ArticleComment;
import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.quiz.entity.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Page<Quiz> findAllByContent(Content content, Pageable pageable);
}
