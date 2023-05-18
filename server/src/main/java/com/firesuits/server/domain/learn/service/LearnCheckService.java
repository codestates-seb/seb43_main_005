package com.firesuits.server.domain.learn.service;

import com.firesuits.server.domain.content.service.ContentProgressService;
import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.learn.entity.LearnCheck;
import com.firesuits.server.domain.learn.repository.LearnCheckRepository;
import com.firesuits.server.domain.learn.repository.LearnRepository;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class LearnCheckService {

    private final LearnCheckRepository learnCheckRepository;
    private final MemberRepository memberRepository;
    private final ContentProgressService contentProgressService;
    private final LearnRepository learnRepository;


    public LearnCheckService(LearnCheckRepository learnCheckRepository, MemberRepository memberRepository, ContentProgressService contentProgressService, LearnRepository learnRepository) {
        this.learnCheckRepository = learnCheckRepository;
        this.memberRepository = memberRepository;
        this.contentProgressService = contentProgressService;
        this.learnRepository = learnRepository;
    }

    @Transactional
    public void updateLearnCheck(Long learnCheckId, String email, boolean completed){
        Member member = memberOrException(email);
        LearnCheck learnCheck = learnCheckRepository.findById(learnCheckId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND));

        if (!learnCheck.getMember().equals(member)){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION);
        }

        learnCheck.setCompleted(completed);

        Long contentId = learnCheck.getLearn().getContentBoard().getContentId();
        contentProgressService.updateContentProgress(email, contentId);
    }

    public boolean existsByLearnIdAndMemberId(Long learnId, Long memberId){
        return learnCheckRepository.existsByLearnLearnIdAndMemberMemberId(learnId, memberId);
    }

    @Transactional
    public void createLearnCheck(Long learnId, String email){
        LearnCheck learnCheck = new LearnCheck();
        Learn learn = learnRepository.findById(learnId).orElseThrow( () ->
                new BusinessLogicException(ExceptionCode.INVALID_REQUEST));
        Member member = memberOrException(email);
        learnCheck.setLearn(learn);
        learnCheck.setMember(member);
        learnCheck.setCompleted(false);
        learnCheckRepository.save(learnCheck);
    }

    private Member memberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }
}
