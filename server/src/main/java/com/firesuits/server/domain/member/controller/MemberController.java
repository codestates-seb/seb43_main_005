package com.firesuits.server.domain.member.controller;

import com.firesuits.server.domain.article.dto.response.MyCommentsResponse;
import com.firesuits.server.domain.member.dto.MemberDto;
import com.firesuits.server.domain.member.dto.request.*;
import com.firesuits.server.domain.member.dto.response.MemberDetailResponse;
import com.firesuits.server.domain.member.dto.response.MemberJoinResponse;
import com.firesuits.server.domain.member.dto.response.MemberResponse;
import com.firesuits.server.domain.member.service.MemberService;
import com.firesuits.server.domain.member.service.PasswordResetService;
import com.firesuits.server.global.auth.dto.LoginDto;
import com.firesuits.server.global.error.response.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final PasswordResetService passwordResetService;

    public MemberController(MemberService memberService, PasswordResetService passwordResetService) {
        this.memberService = memberService;
        this.passwordResetService = passwordResetService;
    }

    //회원가입
    @PostMapping
    public Response<MemberJoinResponse> join(@RequestBody MemberJoinRequest request){
        return Response.success(MemberJoinResponse.from(memberService.join(request.getEmail(), request.getPassword(), request.getCheckPassword(), request.getNickname(), request.getMemberMbti())));
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

    //닉네임 수정
    @PatchMapping("/change-nickname")
    public Response<Void> updateNickName(@RequestBody MemberNickNameUpdateRequest request,
                                                   Authentication authentication){
        memberService.updateNickName(authentication.getName(), request.getNickName());
        return Response.success();
    }

    //프로필 이미지, 닉네임 동시
    @PatchMapping("/update")
    public Response<MemberResponse> update(@RequestBody MemberUpdateRequest request,
                                           Authentication authentication){
        MemberDto memberDto = memberService.update(authentication.getName(), Optional.ofNullable(request.getNickName()), Optional.ofNullable(request.getProfileImage()));
        return Response.success(MemberResponse.from(memberDto));
    }

    //Mbti 수정
    @PatchMapping("/mbti")
    public Response<MemberResponse> updateMbti(@RequestBody MemberMbtiUpdateRequest request,
                                               Authentication authentication){
        MemberDto memberDto = memberService.updateMemberMbti(authentication.getName(), request.getMemberMbti());
        return Response.success(MemberResponse.from(memberDto));
    }

    //테마 수정
    @PatchMapping("/theme")
    public Response<Void> updateTheme(@RequestBody MemberThemeUpdateRequest request,
                                      Authentication authentication){
        memberService.updateMemberTheme(authentication.getName(), request.getMemberTheme());
        return Response.success();
    }

    //비밀번호 수정
    @PatchMapping("/change-password")
    public Response<Void> updatePassword(@RequestBody MemberPasswordUpdateRequest request,
                                         Authentication authentication){
        memberService.updatePassword(authentication.getName(), request.getCurrentPassword(), request.getNewPassword(), request.getCheckNewPassword());
        return Response.success();
    }

    //비밀번호 재설정 코드 이메일 전송
    @PostMapping("/password-reset-request")
    public Response<Void> requestPasswordReset(@RequestBody MemberPasswordResetRequest request){
        passwordResetService.sendResetPasswordCode(request.getEmail());
        return Response.success();
    }

    //비밀번호 재설정
    @PostMapping("/password-reset")
    public Response<Void> resetPassword(@RequestBody MemberPasswordResetRequestTo request){
        passwordResetService.resetPassword(request.getToken(), request.getNewPassword());
        return Response.success();
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

    //멤버 정보
    @GetMapping("/info")
    public Response<MemberDetailResponse> getMemberInfo(Authentication authentication){
        MemberDto memberDto = memberService.getMemberInfo(authentication.getName());
        return Response.success(MemberDetailResponse.from(memberDto));
    }

    //출석체크
    @PostMapping("/check-in")
    public Response<Void> checkIn(Authentication authentication){
        memberService.checkIn(authentication.getName());
        return Response.success();
    }

    //출석체크한 날짜
    @GetMapping("/check-in-date")
    public Response<List<LocalDate>> getCheckDates(Authentication authentication){
        List<LocalDate> checkInDates = memberService.getCheckInDates(authentication.getName());
        return Response.success(checkInDates);
    }

}
