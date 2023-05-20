package com.firesuits.server.domain.chat.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.firesuits.server.domain.chat.dto.common.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Choice {

    @JsonProperty("index")
    public int index;

    @JsonProperty("message")
    public Message message;

    @JsonProperty("finish_reason")
    public String finish_reason;
}
