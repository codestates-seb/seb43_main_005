package com.firesuits.server.domain.chat.controller;

import com.firesuits.server.domain.chat.dto.request.ChatBotInputRequest;
import com.firesuits.server.domain.chat.dto.response.ChatResponse;
import com.firesuits.server.domain.chat.service.ChatService;
import com.firesuits.server.global.error.response.Response;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public Response<ChatResponse> InputRequest(@RequestBody ChatBotInputRequest request){
        ChatResponse chatResponse = chatService.getChatResponse(request.getMessage());
        return Response.success(chatResponse);
    }
}
