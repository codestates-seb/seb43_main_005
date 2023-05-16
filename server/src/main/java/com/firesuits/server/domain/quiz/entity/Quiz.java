package com.firesuits.server.domain.quiz.entity;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.global.audit.AuditingFields;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Quiz extends AuditingFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;
    private String detail;
    private String example;
    private String correct;
    private String commentary;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quizResult_id")
    private QuizResult quizResult;

    public static Quiz of(Content content, Member member, String detail, String example, String correct, String commentary){
        Quiz quiz = new Quiz();
        quiz.setContent(content);
        quiz.setMember(member);
        quiz.setDetail(detail);
        quiz.setExample(example);
        quiz.setCommentary(commentary);
        quiz.setCorrect(correct);
        quiz.setContent(content);

        return quiz;
    }
}
