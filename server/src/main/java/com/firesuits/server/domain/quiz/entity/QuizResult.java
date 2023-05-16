package com.firesuits.server.domain.quiz.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class QuizResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizResultId;

    @OneToOne(mappedBy = "quizResult")
    private Quiz quiz;
    private Boolean result;

    public QuizResult(Quiz quiz, Boolean result){
        this.quiz = quiz;
        this.result = result;
    }
}
