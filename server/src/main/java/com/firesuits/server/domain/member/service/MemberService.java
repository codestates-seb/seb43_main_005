package com.firesuits.server.domain.member.service;

import com.firesuits.server.domain.member.dto.MemberDto;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.global.auth.utils.CustomAuthorityUtils;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils customAuthorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.customAuthorityUtils = customAuthorityUtils;
    }

    public MemberDto join(String email, String password, String name){
        memberRepository.findByEmail(email).ifPresent(it -> {
            throw new BusinessLogicException(ExceptionCode.DUPLICATED_EMAIL, String.format("%s is duplicated", email));
        });

        Member savedMember = memberRepository.save(Member.of(email, name, passwordEncoder.encode(password)));
        List<String> roles = customAuthorityUtils.createRoles(email);
        savedMember.setRoles(roles);
        return MemberDto.from(savedMember);
    }
}
