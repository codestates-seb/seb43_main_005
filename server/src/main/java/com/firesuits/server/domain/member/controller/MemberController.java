package com.firesuits.server.domain.member.controller;

import com.firesuits.server.domain.member.dto.MemberDto;
import com.firesuits.server.domain.member.dto.request.MemberJoinRequest;
import com.firesuits.server.domain.member.dto.request.MemberProfileImageRequest;
import com.firesuits.server.domain.member.dto.response.MemberJoinResponse;
import com.firesuits.server.domain.member.dto.response.MemberResponse;
import com.firesuits.server.domain.member.service.MemberService;
import com.firesuits.server.global.auth.dto.LoginDto;
import com.firesuits.server.global.error.response.Response;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    //회원가입
    @PostMapping
    public Response<MemberJoinResponse> join(@RequestBody MemberJoinRequest request){
        return Response.success(MemberJoinResponse.from(memberService.join(request.getEmail(), request.getPassword(), request.getNickname())));
    }

    // 로그인 Security 위임, 문서화를 위한 용도
    @PostMapping("/login")
    public void login(@RequestBody LoginDto request) {
    }

    //프로필 이미지 수정
    @PatchMapping("/profile-image")
    public Response<MemberResponse> updateProfileImage(@RequestBody MemberProfileImageRequest request,
                                                       Authentication authentication){
        MemberDto memberDto = memberService.updateProfileImage(authentication.getName(), request.getProfileImage());
        return Response.success(MemberResponse.from(memberDto));
    }

    //회원 탈퇴
    @DeleteMapping
    public Response<Void> delete(Authentication authentication){
        memberService.delete(authentication.getName());
        return Response.success();
    }


}
