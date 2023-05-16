package com.firesuits.server.domain.member.service;

import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.entity.PasswordReset;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.domain.member.repository.PasswordResetRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class PasswordResetService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final PasswordResetRepository passwordResetRepository;

    public PasswordResetService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, EmailService emailService, PasswordResetRepository passwordResetRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.passwordResetRepository = passwordResetRepository;
    }

    public void sendResetPasswordCode(String email){
        Member member = memberOrException(email);

        String temporaryCode = generateTemporaryCode();

        PasswordReset passwordReset = new PasswordReset();
        passwordReset.setMember(member);
        passwordReset.setToken(temporaryCode);
        passwordReset.setExpiration(LocalDateTime.now().plusHours(1));

        passwordResetRepository.save(passwordReset);
        emailService.sendTemporaryCode(email, temporaryCode);
    }

    public void resetPassword(String code, String newPassword){
        PasswordReset token = passwordResetRepository.findByToken(code);
        if (token == null || LocalDateTime.now().isAfter(token.getExpiration())) {
            throw new BusinessLogicException(ExceptionCode.WRONG_CODE, "코드가 일치하지 않습니다.");
        }
        Member member = token.getMember();
        member.setPassword(passwordEncoder.encode(newPassword));
        passwordResetRepository.delete(token);
        memberRepository.save(member);
    }

    private String generateTemporaryCode(){
        return String.format("%06d", new Random().nextInt(999999));
    }

    private Member memberOrException(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }
}
