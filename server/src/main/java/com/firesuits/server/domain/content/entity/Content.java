package com.firesuits.server.domain.content.entity;

import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.global.audit.AuditingFields;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

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


    public static Content of(String title, String contentImg, BigDecimal progress, Member member){
        Content content =new Content();
        content.setTitle(title);
        content.setContentImg(contentImg);
        content.setProgress(progress);
        content.setMember(member);

        return content;
    }
}
