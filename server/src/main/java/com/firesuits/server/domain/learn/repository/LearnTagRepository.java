package com.firesuits.server.domain.learn.repository;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.learn.entity.LearnTag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearnTagRepository extends JpaRepository<LearnTag, Long> {
    Page<LearnTag> findAllByLearn(Learn learn, Pageable pageable);

//    Page<LearnTag> findAllByContentLearn(Content content, Learn learn, Pageable pageable);

}
