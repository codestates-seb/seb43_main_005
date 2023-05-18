package com.firesuits.server.domain.quiz.entity;

import com.firesuits.server.domain.member.entity.Member;
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
    private boolean answer;
    private boolean result;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    public static QuizResult of(Quiz quiz, Member member, boolean answer, boolean result){
        QuizResult quizResult = new QuizResult();
        quizResult.setQuiz(quiz);
        quizResult.setMember(member);
        quizResult.setAnswer(answer);
        quizResult.setResult(result);

        return quizResult;
    }
}