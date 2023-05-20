package com.firesuits.server.domain.chat.service;

import com.firesuits.server.domain.chat.dto.common.Message;
import com.firesuits.server.domain.chat.dto.request.ChatRequest;
import com.firesuits.server.domain.chat.dto.response.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@Service
public class ChatService {

    @Value("${openai.api-key}")
    private String apiKey;

    private static final String OPEN_AI_CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions";

    private final RestTemplate restTemplate;

    public ChatService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ChatResponse getChatResponse(String prompt){

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        ChatRequest chatRequest = new ChatRequest();
        chatRequest.setModel("gpt-3.5-turbo");
        chatRequest.setMessages(List.of(new Message("user", prompt))); // 입력 프롬프트
        chatRequest.setMax_tokens(100); // 채팅 완료시 생성할 최대 토큰수

        HttpEntity<ChatRequest> request = new HttpEntity<>(chatRequest, headers);

        return restTemplate.postForObject(OPEN_AI_CHAT_ENDPOINT, request, ChatResponse.class);
    }
}
