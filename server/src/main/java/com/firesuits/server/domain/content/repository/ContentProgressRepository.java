package com.firesuits.server.domain.content.repository;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.content.entity.ContentProgress;
import com.firesuits.server.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContentProgressRepository extends JpaRepository<ContentProgress, Long> {

    Optional<ContentProgress> findByMemberAndContent_ContentId(Member member, Long contentId);

    ContentProgress findByMemberAndContent(Member member, Content content);

    @Query("SELECT DISTINCT c FROM ContentProgress c WHERE c.member.id = :memberId")
    List<ContentProgress> findByAllContentProgress(@Param("memberId")Long memberId);

    @Query("SELECT c FROM ContentProgress c WHERE c.member.id = :memberId")
    Page<ContentProgress> findAllByContentProgress(@Param("memberId")Long memberId, Pageable pageable);
}
