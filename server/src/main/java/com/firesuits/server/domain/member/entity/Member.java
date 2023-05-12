package com.firesuits.server.domain.member.entity;

import com.firesuits.server.domain.article.entity.Article;
import com.firesuits.server.domain.article.entity.ArticleComment;
import com.firesuits.server.domain.article.entity.CommentLike;
import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.quiz.entity.Quiz;
import com.firesuits.server.global.audit.AuditingFields;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends AuditingFields {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String email;
    private String nickName;
    private String password;
    private int experience;
    private int level;
    private int requiredExperience;
    private String profileImage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberMbti memberMbti;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Article> articles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<ArticleComment> articleComments = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<CommentLike> commentLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Content> contents = new ArrayList<>();

    // learn 테이블 생성을 위해서 임의로 작성
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Learn> learns = new ArrayList<>();

    // quiz 테이블 생성을 위해서 임의로 작성
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Quiz> quizzes = new ArrayList<>();

    public static Member of(String email, String nickName, String encodedPwd, MemberMbti memberMbti) {
        Member entity = new Member();
        entity.setEmail(email);
        entity.setNickName(nickName);
        entity.setPassword(encodedPwd);
        entity.setMemberMbti(memberMbti);
        entity.setLevel(0);
        entity.updateRequiredExperience();
        return entity;
    }

    public void addExperience(int exp) {
        this.experience += exp;
        updateRequiredExperience();
        if (this.level < 5) {
            checkLevelUp();
        }
    }

    private void checkLevelUp() {
        while (this.experience >= ((this.level + 1) * 100)) {
            this.experience -= ((this.level + 1) * 100);
            levelUp();
        }
    }

    public void levelUp() {
        if (this.level < 5) {
            this.level++;
        }
        updateRequiredExperience();
    }

    private void updateRequiredExperience() {
        if (this.level == 5) {
            this.requiredExperience = 0;
        } else {
            this.requiredExperience = ((this.level + 1) * 100) - this.experience;
        }
    }
}
