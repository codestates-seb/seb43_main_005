package com.firesuits.server.domain.quiz.repository;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.quiz.entity.Quiz;
import com.firesuits.server.domain.quiz.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {


    // 멤버가 이미 푼 퀴즈 결과 확인
    Boolean existsByQuizQuizIdAndMemberMemberIdAndContentContentId(Long quizId, Long memberId, Long contentId);

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

    QuizResult findByQuizResultIdAndContentAndAndQuizAndMember(Long quizResultId, Content content, Quiz quiz, Member member);
}