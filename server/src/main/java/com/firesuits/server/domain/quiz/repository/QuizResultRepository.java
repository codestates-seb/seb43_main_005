package com.firesuits.server.domain.quiz.repository;

import com.firesuits.server.domain.quiz.dto.QuizResultDto;
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


    // 멤버가 이미 푼 퀴즈 결과 확인
    Boolean existsByQuizQuizIdAndMemberMemberId(Long quizId, Long memberId);

    // 퀴즈 결과 응답 갯수
    int countByQuizQuizIdIsNotNullAndContentContentId(Long content_id);

    // 퀴즈 정답 갯수
    int countByResultIsTrueAndContentContentIdAndMemberMemberId(Long content_id, Long member_id);

    // 퀴즈 오답 갯수
    int countByResultIsFalseAndContentContentIdAndMemberMemberId(Long content_id, Long member_id);

    /* 특정 컨텐츠와 멤버에서 조회 구현을 위해 임시 저장

    @Query(value = "SELECT c FROM QuizResult c WHERE c.content.id = contentId AND c.member.id = memberId")
    Page<QuizResultDto> findAllByContentIdAndMemberId(@Param("contentId") Long contentId, @Param("memberId") Long memberId, Pageable pageable);

     */
}