package com.firesuits.server.domain.article.repository;

import com.firesuits.server.domain.article.entity.View;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewRepository extends JpaRepository<View, Long> {
}
