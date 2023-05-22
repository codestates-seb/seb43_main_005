package com.firesuits.server.domain.quiz.repository;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.quiz.entity.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Page<Quiz> findAllByContent(Content content, Pageable pageable);
    Quiz findByQuizIdAndContentAndMember(Long quizId, Content content, Member member);

    @Query(value = "SELECT c FROM Quiz c WHERE c.id = quizId AND c.content.id = contentId AND c.member.id = memberId")
    Quiz findByQuizIdAndContentIdAndMemberId(@Param("quizId") Long quizId,@Param("contentId") Long contentId, @Param("memberId") Long memberId);
}
