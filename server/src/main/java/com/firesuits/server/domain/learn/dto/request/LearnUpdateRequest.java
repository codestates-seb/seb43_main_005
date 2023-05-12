package com.firesuits.server.domain.learn.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LearnUpdateRequest {
    private String title;
    private String content;
}
