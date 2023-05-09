package com.firesuits.server.domain.content.dto;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ContentDto {

    // 콘텐츠 등록
    private Long contentId;
    private String title;
    private String contentImg;
    private BigDecimal progress;
    private MemberDto member;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    // 정적 팩토리 메소드 사용하여 생성
    public static ContentDto from(Content entity){
        return new ContentDto(
                entity.getContentId(),
                entity.getTitle(),
                entity.getContentImg(),
                entity.getProgress(),
                MemberDto.from(entity.getMember()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }

}
