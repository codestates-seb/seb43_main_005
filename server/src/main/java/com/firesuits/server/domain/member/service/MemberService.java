package com.firesuits.server.domain.member.service;

import com.firesuits.server.domain.article.dto.ArticleCommentDto;
import com.firesuits.server.domain.article.repository.ArticleCommentRepository;
import com.firesuits.server.domain.member.dto.MemberDto;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.entity.MemberMbti;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.global.auth.utils.CustomAuthorityUtils;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ArticleCommentRepository articleCommentRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;

    public MemberService(MemberRepository memberRepository, ArticleCommentRepository articleCommentRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils customAuthorityUtils) {
        this.memberRepository = memberRepository;
        this.articleCommentRepository = articleCommentRepository;
        this.passwordEncoder = passwordEncoder;
        this.customAuthorityUtils = customAuthorityUtils;
    }

    //회원가입
    public MemberDto join(String email, String password, String checkPassword, String name, MemberMbti memberMbti){
        memberRepository.findByEmail(email).ifPresent(it -> {
            throw new BusinessLogicException(ExceptionCode.DUPLICATED_EMAIL, String.format("%s is duplicated", email));
        });
        if(!password.equals(checkPassword)){
            throw new BusinessLogicException(ExceptionCode.PASSWORD_MISMATCH, "비밀번호가 일치하지 않습니다.");
        }

        if (memberMbti == null){
            memberMbti = MemberMbti.테스트전;
        }
        Member savedMember = memberRepository.save(Member.of(email, name, passwordEncoder.encode(password), memberMbti));
        if(!savedMember.getMemberMbti().equals(MemberMbti.테스트전)){
            savedMember.addExperience(100);
            savedMember = memberRepository.save(savedMember);
        }
        List<String> roles = customAuthorityUtils.createRoles(email);
        if(savedMember.getProfileImage() == null || savedMember.getProfileImage().isEmpty()){
            savedMember.setProfileImage("https://gonue-bucket.s3.ap-northeast-2.amazonaws.com/dbcef092-2952-4b4e-b449-1a312ff668da_basic_profile.png");
        }
        savedMember.setRoles(roles);
        return MemberDto.from(savedMember);
    }

    //프로필 이미지 수정
    public MemberDto updateProfileImage(String email, String profileImage){
        Member member = memberOrException(email);
        member.setProfileImage(profileImage);
        return MemberDto.from(memberRepository.save(member));
    }

    //닉네임 변경
    public MemberDto updateNickName(String email, String nickName){
        Member member = memberOrException(email);
        member.setNickName(nickName);
        memberRepository.save(member);
        return MemberDto.from(member);
    }

    //Mbti 수정
    public MemberDto updateMemberMbti(String email, MemberMbti memberMbti){
        Member member = memberOrException(email);
        if (member.getMemberMbti().equals(MemberMbti.테스트전) && !memberMbti.equals(MemberMbti.테스트전)){
            member.addExperience(100);
        }
        member.setMemberMbti(memberMbti);
        memberRepository.save(member);
        return MemberDto.from(memberRepository.save(member));
    }

    //비밀번호 수정
    public MemberDto updatePassword(String email, String currentPassword, String newPassword, String checkNewPassword){
        Member member = memberOrException(email);

        if(!passwordEncoder.matches(currentPassword, member.getPassword())){
            throw new BusinessLogicException(ExceptionCode.WRONG_PASSWORD, "현재 비밀번호가 일치하지 않습니다.");
        }
        if(!newPassword.equals(checkNewPassword)){
            throw new BusinessLogicException(ExceptionCode.PASSWORD_MISMATCH, "새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
        }
        member.setPassword(passwordEncoder.encode(newPassword));
        memberRepository.save(member);
        return MemberDto.from(member);
    }

    //회원 탈퇴
    public void delete(String email){
        Member member = memberOrException(email);
        memberRepository.delete(member);
    }

    //내가 작성한 토론 댓글
    @Transactional(readOnly = true)
    public Page<ArticleCommentDto> myCommentList(String email, Pageable pageable, String sort){
        Member member = memberOrException(email);
        if (sort != null) {
            if (sort.equals("createdAt")) {
                pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createdAt").descending());
            } else if (sort.equals("likes")) {
                pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("commentLikes").descending().and(Sort.by("createdAt").ascending()));
            }
        } else {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createdAt").ascending());
        }
        return articleCommentRepository.findAllByMember(member, pageable).map(ArticleCommentDto::from);
    }

    //멤버 정보
    public MemberDto getMemberInfo(String email){
        Member member = memberOrException(email);
        return MemberDto.from(member);
    }

    private Member memberOrException(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }
}
