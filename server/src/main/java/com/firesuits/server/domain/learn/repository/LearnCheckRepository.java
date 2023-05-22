package com.firesuits.server.domain.learn.repository;

import com.firesuits.server.domain.learn.entity.LearnCheck;
import com.firesuits.server.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearnCheckRepository extends JpaRepository<LearnCheck, Long> {

    List<LearnCheck> findAllByMemberAndLearn_ContentBoard_ContentId(Member member, Long contentId);

    @Query("SELECT DISTINCT c FROM LearnCheck c WHERE c.member.id = :memberId")
    List<LearnCheck> findAllByLearnCheck(@Param("memberId")Long memberId);

    @Query("SELECT c FROM LearnCheck c WHERE c.member.id = :memberId")
    Page<LearnCheck> findAllByLearnCheck(@Param("memberId")Long memberId, Pageable pageable);

    boolean existsByLearnLearnIdAndMemberMemberId(Long learnId, Long memberId);
}
