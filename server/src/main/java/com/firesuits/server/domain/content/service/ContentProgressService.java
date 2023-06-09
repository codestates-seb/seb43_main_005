package com.firesuits.server.domain.content.service;

import com.firesuits.server.domain.content.dto.ContentProgressDto;
import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.content.entity.ContentProgress;
import com.firesuits.server.domain.content.repository.ContentProgressRepository;
import com.firesuits.server.domain.content.repository.ContentRepository;
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

import java.util.List;

@Service
public class ContentProgressService {

    private final ContentProgressRepository contentProgressRepository;
    private final LearnRepository learnRepository;
    private final LearnCheckRepository learnCheckRepository;
    private final MemberRepository memberRepository;
    private ContentRepository contentRepository;

    public ContentProgressService(ContentProgressRepository contentProgressRepository, LearnRepository learnRepository, LearnCheckRepository learnCheckRepository, MemberRepository memberRepository, ContentRepository contentRepository) {
        this.contentProgressRepository = contentProgressRepository;
        this.learnRepository = learnRepository;
        this.learnCheckRepository = learnCheckRepository;
        this.memberRepository = memberRepository;
        this.contentRepository = contentRepository;
    }

    @Transactional
    public void updateContentProgress(String email, Long contentId){
        Member member = memberOrException(email);
        Content content = contentOrException(contentId);
        ContentProgress contentProgress = contentProgressRepository.findByMemberAndContent_ContentId(member, contentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.WRONG_CODE, String.format("Progress 오류", content)));

        //learnCheck true 개수로 progress 계산
        List<LearnCheck> learnCheckslist = learnCheckRepository.findAllByMemberAndLearn_ContentBoard_ContentId(member, contentId);
        double completedCount = learnCheckslist.stream().filter(LearnCheck::getCompleted).count();
        double progress = completedCount / learnCheckslist.size() * 100;

        contentProgress.setProgress(progress);
    }
    //ContentProgress 단건 조회
    public ContentProgressDto getContentProgress(Long contentId, String email){
        Member member = memberOrException(email);
        Content content = contentOrException(contentId);

        ContentProgress contentProgress = contentProgressRepository.findByMemberAndContent_ContentId(member, contentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHECK_PROGRESS_NOT_FOUND));
        return ContentProgressDto.from(contentProgress);
    }
    //ContentProgress 전체 조회
    public Page<ContentProgressDto> listContentProgress(String email, Pageable pageable){
        Member member = memberOrException(email);

        List<ContentProgress> contentProgresses = contentProgressRepository.findByAllContentProgress(member.getMemberId());
        if(contentProgresses.isEmpty()){
            throw new BusinessLogicException(ExceptionCode.CHECK_PROGRESS_NOT_FOUND);
        }
        return contentProgressRepository.findAllByContentProgress(member.getMemberId(),pageable).map(ContentProgressDto::from);
    }

    private Member memberOrException(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }

    private Content contentOrException(Long contentId){
        return contentRepository.findById(contentId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND, String.format("%s 번의 컨텐츠가 존재 하지 않습니다.", contentId)));
    }

    private Learn learnOrException(Long learnId){
        return learnRepository.findById(learnId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.INVALID_REQUEST, String.format("%s 번의 요청이 잘못되었습니다.", learnId)));
    }
}