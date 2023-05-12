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
import org.springframework.data.domain.Pageable;
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
    public MemberDto join(String email, String password, String name, MemberMbti memberMbti){
        memberRepository.findByEmail(email).ifPresent(it -> {
            throw new BusinessLogicException(ExceptionCode.DUPLICATED_EMAIL, String.format("%s is duplicated", email));
        });
        if (memberMbti == null){
            memberMbti = MemberMbti.테스트전;
        }
        Member savedMember = memberRepository.save(Member.of(email, name, passwordEncoder.encode(password), memberMbti));
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

    //Mbti 수정
    public MemberDto updateMemberMbti(String email, MemberMbti memberMbti){
        Member member = memberOrException(email);
        member.setMemberMbti(memberMbti);
        memberRepository.save(member);
        return MemberDto.from(memberRepository.save(member));
    }

    //회원 탈퇴
    public void delete(String email){
        Member member = memberOrException(email);
        memberRepository.delete(member);
    }

    //내가 작성한 토론 댓글
    @Transactional(readOnly = true)
    public Page<ArticleCommentDto> myCommentList(String email, Pageable pageable){
        Member member = memberOrException(email);
        return articleCommentRepository.findAllByMember(member, pageable).map(ArticleCommentDto::from);
    }

    private Member memberOrException(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }
}
