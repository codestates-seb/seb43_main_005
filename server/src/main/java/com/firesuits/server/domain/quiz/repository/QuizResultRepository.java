package com.firesuits.server.domain.quiz.repository;

import com.firesuits.server.domain.quiz.dto.QuizResultDto;
import com.firesuits.server.domain.quiz.dto.response.QuizResultResponse;
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
    Boolean existsByQuizQuizIdAndMemberMemberId(Long quizId, Long memberId);

    // 컨텐츠 내의 멤버가 푼 퀴즈 카운트 -> quiz로 이동예정
//    @Query(value = "SELECT COUNT (*) FROM QuizResult entity WHERE entity.content.id = :content_id AND entity.member.id = :member_id")
//    int findByContentContentIdAndMemberMemberId(@Param("content_id") Long contentId, @Param("member_id") Long memberId);

//    @Query(value = "SELECT (*) FROM QuizResult entity WHERE entity.id = :content_id AND entity.member.id = :member_id")

    int countByQuizQuizIdIsNotNullAndContentContentId(Long content_id);
    int countByResultIsTrueAndContentContentIdAndMemberMemberId(Long content_id, Long member_id);
    int countByResultIsFalseAndContentContentIdAndMemberMemberId(Long content_id, Long member_id);

    @Query(value = "SELECT c FROM QuizResult c WHERE c.content.id = contentId AND c.member.id = memberId")
    Page<QuizResultDto> findAllByContentIdAndMemberId(@Param("contentId") Long contentId, @Param("memberId") Long memberId, Pageable pageable);
}