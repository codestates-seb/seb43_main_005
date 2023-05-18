package com.firesuits.server.domain.learn.repository;

import com.firesuits.server.domain.learn.entity.LearnCheck;
import com.firesuits.server.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearnCheckRepository extends JpaRepository<LearnCheck, Long> {
    List<LearnCheck> findAllByMemberAndLearn_ContentBoard_ContentId(Member member, Long contentId);

    boolean existsByLearnLearnIdAndMemberMemberId(Long learnId, Long memberId);
}
