package com.firesuits.server.domain.content.repository;

import com.firesuits.server.domain.content.entity.ContentProgress;
import com.firesuits.server.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContentProgressRepository extends JpaRepository<ContentProgress, Long> {

    Optional<ContentProgress> findByMemberAndContent_ContentId(Member member, Long contentId);
}
