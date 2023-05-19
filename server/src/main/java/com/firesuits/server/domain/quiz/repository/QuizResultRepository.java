package com.firesuits.server.domain.quiz.repository;

import com.firesuits.server.domain.quiz.entity.QuizResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    // 컨텐츠 내의 멤버가 푼 퀴즈 결과 조회
    List<QuizResult> findAllByContentContentIdAndMemberMemberId(Long contentId, Long memberId);

    // 멤버가 이미 푼 퀴즈 결과 확인
    boolean existsByQuizQuizIdAndMemberMemberId(Long quizId, Long memberId);

    // 컨텐츠 내의 멤버가 푼 퀴즈 카운트 -> quiz로 이동예정
    @Query(value = "SELECT COUNT (*) FROM QuizResult entity WHERE entity.content.id = :content_id AND entity.member.id = :member_id")
    Long findByContentContentIdAndMemberMemberId(@Param("content_id") Long contentId, @Param("member_id") Long memberId);
}