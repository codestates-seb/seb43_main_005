package com.firesuits.server.domain.learn.repository;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearnRepository extends JpaRepository<Learn, Long> {
    Page<Learn> findAllByContent(Content contentBoard, Pageable pageable);
}
