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

    private Integer answer;
    private Boolean result;

    public static QuizResult of(Quiz quiz, Integer answer, Boolean result){
        QuizResult quizResult = new QuizResult();
        quizResult.setQuiz(quiz);
        quizResult.setAnswer(answer);
        quizResult.setResult(result);

        return quizResult;
    }
}
