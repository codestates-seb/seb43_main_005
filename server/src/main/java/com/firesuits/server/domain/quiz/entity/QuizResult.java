package com.firesuits.server.domain.quiz.entity;

import com.firesuits.server.domain.content.entity.Content;
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

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    private boolean answer;
    private boolean result;

    public static QuizResult of(Quiz quiz, Member member, boolean answer, boolean result){
        QuizResult quizResult = new QuizResult();
        quizResult.setQuiz(quiz);
        quizResult.setMember(member);
        quizResult.setAnswer(answer);
        quizResult.setResult(result);

        return quizResult;
    }

}

