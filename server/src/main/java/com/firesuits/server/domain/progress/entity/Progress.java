package com.firesuits.server.domain.progress.entity;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.quiz.entity.Quiz;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long progressId;

    private Integer progressCount;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @ManyToOne
    @JoinColumn(name = "learn_id")
    private Learn learn;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    public static Progress of(Integer progressCount, Member member, Content content, Learn learn){
        Progress progress = new Progress();
        progress.setProgressCount(progressCount);
        progress.setMember(member);
        progress.setContent(content);
        progress.setLearn(learn);
        return progress;
    }

    public static Progress of(Integer progressCount, Member member, Content content, Learn learn, Quiz quiz){
        Progress progress = new Progress();
        progress.setProgressCount(progressCount);
        progress.setMember(member);
        progress.setContent(content);
        progress.setLearn(learn);
        progress.setQuiz(quiz);
        return progress;
    }
}
