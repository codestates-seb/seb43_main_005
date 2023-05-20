package com.firesuits.server.domain.learn.service;

import com.firesuits.server.domain.content.entity.ContentProgress;
import com.firesuits.server.domain.content.repository.ContentProgressRepository;
import com.firesuits.server.domain.content.service.ContentProgressService;
import com.firesuits.server.domain.learn.dto.LearnCheckDto;
import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.learn.entity.LearnCheck;
import com.firesuits.server.domain.learn.repository.LearnCheckRepository;
import com.firesuits.server.domain.learn.repository.LearnRepository;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class LearnCheckService {
    private final MemberRepository memberRepository;
    private final LearnCheckRepository learnCheckRepository;
    private final LearnRepository learnRepository;
    private final ContentProgressService contentProgressService;
    private final ContentProgressRepository contentProgressRepository;

    public LearnCheckService(MemberRepository memberRepository, LearnCheckRepository learnCheckRepository, LearnRepository learnRepository, ContentProgressService contentProgressService, ContentProgressRepository contentProgressRepository) {
        this.memberRepository = memberRepository;
        this.learnCheckRepository = learnCheckRepository;
        this.learnRepository = learnRepository;
        this.contentProgressService = contentProgressService;
        this.contentProgressRepository = contentProgressRepository;
    }

    @Transactional
    public void createLearnCheck(Long learnId, String email) {
        Member member = memberOrException(email);
        Learn learn = learnOrException(learnId);

        ContentProgress contentProgress = contentProgressRepository.findByMemberAndContent(member,learn.getContentBoard());
        if(contentProgress == null){
            ContentProgress newContentProgress = new ContentProgress();
            learnCheckRepository.save(LearnCheck.of(learn,member,newContentProgress));
        }
        learnCheckRepository.save(LearnCheck.of(learn,member,contentProgress));
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

    @Transactional(readOnly = true)
    public LearnCheckDto findById(Long learnCheckId, String email){
        Member member = memberOrException(email);
        LearnCheck learnCheck = learnCheckOrException(learnCheckId);
        checkLearnCheckAndMember(learnCheck,member,email,learnCheckId);
        return LearnCheckDto.from(learnCheck);
    }

    @Transactional(readOnly = true)
    public Page<LearnCheckDto> list(String email, Pageable pageable) {
        Member member = memberOrException(email);

        LearnCheck learnCheck = learnCheckRepository.findByMember(member);
        if (learnCheck == null || learnCheck.getMember().getMemberId() != member.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.CHECK_PROGRESS_NOT_FOUND);
        }
        return learnCheckRepository.findAllByLearnCheck(member.getMemberId(), pageable).map(LearnCheckDto::from);
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

    private void checkLearnCheckAndMember(LearnCheck learnCheck, Member member, String email, Long learnCheckId) {
        if (!Objects.equals(learnCheck.getMember().getMemberId(), member.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 는 %s 학습에 대한 진행 여부 권한을 가지고 있지 않습니다.", email, learnCheckId));
        }
    }
}
