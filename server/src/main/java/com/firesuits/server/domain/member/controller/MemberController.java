package com.firesuits.server.domain.member.controller;

import com.firesuits.server.domain.article.dto.response.ArticleCommentResponse;
import com.firesuits.server.domain.article.dto.response.MyCommentsResponse;
import com.firesuits.server.domain.member.dto.MemberDto;
import com.firesuits.server.domain.member.dto.request.MemberJoinRequest;
import com.firesuits.server.domain.member.dto.request.MemberMbtiUpdateRequest;
import com.firesuits.server.domain.member.dto.request.MemberProfileImageUpdateRequest;
import com.firesuits.server.domain.member.dto.response.MemberJoinResponse;
import com.firesuits.server.domain.member.dto.response.MemberResponse;
import com.firesuits.server.domain.member.service.MemberService;
import com.firesuits.server.global.auth.dto.LoginDto;
import com.firesuits.server.global.error.response.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
        return Response.success(MemberJoinResponse.from(memberService.join(request.getEmail(), request.getPassword(), request.getNickname(), request.getMemberMbti())));
    }

    // 로그인 Security 위임, 문서화를 위한 용도
    @PostMapping("/login")
    public void login(@RequestBody LoginDto request) {
    }

    //프로필 이미지 수정
    @PatchMapping("/profile-image")
    public Response<MemberResponse> updateProfileImage(@RequestBody MemberProfileImageUpdateRequest request,
                                                       Authentication authentication){
        MemberDto memberDto = memberService.updateProfileImage(authentication.getName(), request.getProfileImage());
        return Response.success(MemberResponse.from(memberDto));
    }

    //Mbti 수정
    @PatchMapping("/mbti")
    public Response<MemberResponse> updateMbti(@RequestBody MemberMbtiUpdateRequest request,
                                               Authentication authentication){
        MemberDto memberDto = memberService.updateMemberMbti(authentication.getName(), request.getMemberMbti());
        return Response.success(MemberResponse.from(memberDto));
    }

    //회원 탈퇴
    @DeleteMapping("/withdrawal")
    public Response<Void> delete(Authentication authentication){
        memberService.delete(authentication.getName());
        return Response.success();
    }

    //내가 작성한 토론 댓글
    @GetMapping("/my-comment")
    public Response<Page<MyCommentsResponse>> myCommentList(
                                                            @RequestParam(name = "sort",required = false) String sort,
                                                            @PageableDefault(sort = "createdBy", direction = Sort.Direction.ASC) Pageable pageable,
                                                            Authentication authentication){
        return Response.success(memberService.myCommentList(authentication.getName(), pageable, sort).map(MyCommentsResponse::from));
    }
}
