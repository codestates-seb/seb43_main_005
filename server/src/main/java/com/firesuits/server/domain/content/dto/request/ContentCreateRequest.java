package com.firesuits.server.domain.content.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
public class ContentCreateRequest {
    private String title;
    private String contentImg;
}
