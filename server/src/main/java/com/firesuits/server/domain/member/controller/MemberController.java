package com.firesuits.server.domain.member.controller;

import com.firesuits.server.domain.member.dto.request.MemberJoinRequest;
import com.firesuits.server.domain.member.dto.response.MemberJoinResponse;
import com.firesuits.server.domain.member.service.MemberService;
import com.firesuits.server.global.auth.dto.LoginDto;
import com.firesuits.server.global.error.response.Response;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping
    public Response<MemberJoinResponse> join(@RequestBody MemberJoinRequest request){
        return Response.success(MemberJoinResponse.from(memberService.join(request.getEmail(), request.getPassword(), request.getNickname())));
    }

    @PostMapping("/login")
    public void login(@RequestBody LoginDto request) {
        // Security 위임, 문서화를 위한 용도
    }
}
