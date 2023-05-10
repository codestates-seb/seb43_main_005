package com.firesuits.server.domain.content.entity;

import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.learn.entity.LearnTag;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.quiz.entity.Quiz;
import com.firesuits.server.global.audit.AuditingFields;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Content extends AuditingFields {
    @Id // 식별자 등록
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 식별자 자동 등록
    private Long contentId;

    private String title;

    @Column(nullable = false)
    private String contentImg;

    @Column(columnDefinition = "Decimal")
    private BigDecimal progress;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // learn 테이블 생성을 위해서 임의로 작성
    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Learn> learns = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Quiz> quizzes = new ArrayList<>();

    public static Content of(String title, String contentImg, BigDecimal progress, Member member){
        Content content =new Content();
        content.setTitle(title);
        content.setContentImg(contentImg);
        content.setProgress(progress);
        content.setMember(member);

        return content;
    }
}
