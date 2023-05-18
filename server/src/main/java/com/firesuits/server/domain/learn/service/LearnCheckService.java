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
    private final MemberRepository memberRepository;
    private final LearnCheckRepository learnCheckRepository;
    private final LearnRepository learnRepository;
    private final ContentProgressService contentProgressService;

    public LearnCheckService(MemberRepository memberRepository, LearnCheckRepository learnCheckRepository, LearnRepository learnRepository, ContentProgressService contentProgressService) {
        this.memberRepository = memberRepository;
        this.learnCheckRepository = learnCheckRepository;
        this.learnRepository = learnRepository;
        this.contentProgressService = contentProgressService;
    }

    @Transactional
    public void createLearnCheck(Long learnId, String email) {
        Member member = memberOrException(email);
        Learn learn = learnOrException(learnId);
        learnCheckRepository.save(LearnCheck.of(learn,member));
    }

    @Transactional
    public void updateLearnCheck(boolean completed,  String email, Long learnCheckId){
        Member member = memberOrException(email);
        LearnCheck learnCheck = learnCheckOrException(learnCheckId);

        if (!learnCheck.getMember().equals(member)){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION);
        }

        learnCheck.setCompleted(completed);

        Long contentId = learnCheck.getLearn().getContentBoard().getContentId();
        contentProgressService.updateContentProgress(email, contentId);
    }
    private Member memberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow( () ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }
    private Learn learnOrException(Long learnId){
        return learnRepository.findById(learnId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.INVALID_REQUEST, String.format("%s 번의 요청이 잘못되었습니다.", learnId)));
    }

    private LearnCheck learnCheckOrException(Long learnCheckId){
        return learnCheckRepository.findById(learnCheckId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.CHECK_NOT_FOUND, String.format("%s 번의 학습 결과가 존재 하지 않습니다.", learnCheckId)));
    }
}
