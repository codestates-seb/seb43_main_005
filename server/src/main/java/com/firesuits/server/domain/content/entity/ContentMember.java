package com.firesuits.server.domain.content.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ContentMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentMemberId;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

}
