package com.firesuits.server.domain.quiz.repository;

import com.firesuits.server.domain.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
