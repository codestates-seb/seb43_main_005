package com.firesuits.server.domain.article.repository;

import com.firesuits.server.domain.article.entity.ArticleComment;
import com.firesuits.server.domain.article.entity.CommentLike;
import com.firesuits.server.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    Optional<CommentLike> findByMemberAndArticleComment(Member member, ArticleComment articleComment);

    @Query(value = "SELECT COUNT(*) FROM CommentLike entity WHERE entity.articleComment = :articleComment")
    Long countByArticleComment(@Param("articleComment") ArticleComment articleComment);
}
