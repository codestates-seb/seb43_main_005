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
    private Boolean correct;
    private String commentary;
    private String result;
    private Integer experience;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    public static Quiz of(String detail, String example, Boolean correct, String commentary, String result, Integer experience, Member member){
        Quiz quiz = new Quiz();
        quiz.setDetail(detail);
        quiz.setExample(example);
        quiz.setCorrect(correct);
        quiz.setCommentary(commentary);
        quiz.setResult(result);
        quiz.setExperience(experience);
        quiz.setMember(member);

        return quiz;
    }
}
