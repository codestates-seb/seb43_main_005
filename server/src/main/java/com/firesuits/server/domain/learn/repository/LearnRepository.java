package com.firesuits.server.domain.learn.repository;

import com.firesuits.server.domain.learn.entity.Learn;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearnRepository extends JpaRepository<Learn, Long> {
    @Query("SELECT c FROM Learn c WHERE c.contentBoard.id = :contentId")
    Page<Learn> findAllByContent(@Param("contentId") Long contentId, Pageable pageable);

    @Query("SELECT c FROM Learn c WHERE c.contentBoard.id = :contentId")
    List<Learn> findByContentId(@Param("contentId") Long contentId);

}
