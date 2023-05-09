package com.firesuits.server.domain.content.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
public class ContentUpdateRequest {
    private String title;
    private String contentImg;
    private BigDecimal progress;
}
