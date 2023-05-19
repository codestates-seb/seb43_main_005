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
    private Boolean answer;
    private Boolean result;
    private int totalCount;
    private int correctCount;
    private int wrongCount;
    public static QuizResult of(Quiz quiz, Member member, Content content, Boolean answer, Boolean result, int totalCount, int correctCount, int wrongCount){
        QuizResult quizResult = new QuizResult();
        quizResult.setContent(content);
        quizResult.setQuiz(quiz);
        quizResult.setMember(member);
        quizResult.setAnswer(answer);
        quizResult.setResult(result);
        quizResult.setTotalCount(totalCount);
        quizResult.setCorrectCount(correctCount);
        quizResult.setWrongCount(wrongCount);

        return quizResult;
    }
}

