package com.firesuits.server.domain.quiz.repository;

import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.quiz.entity.Quiz;
import com.firesuits.server.domain.quiz.entity.QuizResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    Page<QuizResult> findAllByQuiz(Quiz quiz, Pageable pageable);
}
