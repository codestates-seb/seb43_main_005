package com.firesuits.server.domain.progress.repository;

import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.progress.entity.Progress;
import com.firesuits.server.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress, Long> {

    Optional<Progress> findByMemberAndLearn(Member member, Learn learn);
}
