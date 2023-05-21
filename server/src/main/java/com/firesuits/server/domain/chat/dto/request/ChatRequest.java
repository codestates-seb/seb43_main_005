package com.firesuits.server.domain.chat.dto.request;


import com.firesuits.server.domain.chat.dto.common.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {

    private String model;
    private List<Message> messages;
    private Integer max_tokens;
}
