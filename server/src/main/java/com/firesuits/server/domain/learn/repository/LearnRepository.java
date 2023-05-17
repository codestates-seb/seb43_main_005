package com.firesuits.server.domain.learn.repository;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.learn.entity.Learn;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearnRepository extends JpaRepository<Learn, Long> {
    Page<Learn> findAllByContent(Content contentBoard, Pageable pageable);
    @Query("SELECT c FROM Learn c WHERE c.content.id = :contentId")
    List<Learn> findByContentId(Long contentId);

//    @Query("SELECT COUNT(c) FROM Learn c WHERE c.content.id = :contentId")
//    Integer countByLearn(Long contentId);

    @Query("SELECT COUNT(c) FROM Learn c WHERE c.content.id = :contentId")
    Integer countByContentId(Long contentId);
}
