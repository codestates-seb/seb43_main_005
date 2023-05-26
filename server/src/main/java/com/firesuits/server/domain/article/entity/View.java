package com.firesuits.server.domain.article.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class View {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long viewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;
    private Integer viewCount;

    public View(Article article, Integer viewCount) {
        this.article = article;
        this.viewCount = viewCount;
    }
}
