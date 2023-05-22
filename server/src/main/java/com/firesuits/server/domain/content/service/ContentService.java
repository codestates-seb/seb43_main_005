package com.firesuits.server.domain.content.service;

import com.firesuits.server.domain.content.dto.ContentDto;
import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.content.entity.ContentProgress;
import com.firesuits.server.domain.content.repository.ContentProgressRepository;
import com.firesuits.server.domain.content.repository.ContentRepository;
import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.learn.repository.LearnCheckRepository;
import com.firesuits.server.domain.learn.repository.LearnRepository;
import com.firesuits.server.domain.learn.service.LearnCheckService;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ContentService {
    private final ContentRepository contentRepository;
    private final MemberRepository memberRepository;
    private final LearnRepository learnRepository;
    private final ContentProgressRepository contentProgressRepository;
    private final LearnCheckRepository learnCheckRepository;
    private final LearnCheckService learnCheckService;

    public ContentService(ContentRepository contentRepository, MemberRepository memberRepository, LearnRepository learnRepository, ContentProgressRepository contentProgressRepository, LearnCheckRepository learnCheckRepository, LearnCheckService learnCheckService) {
        this.contentRepository = contentRepository;
        this.memberRepository = memberRepository;
        this.learnRepository = learnRepository;
        this.contentProgressRepository = contentProgressRepository;
        this.learnCheckRepository = learnCheckRepository;
        this.learnCheckService = learnCheckService;

    }

    @Transactional
    public void create(String title, String contentImg, String email){
        Member member = memberOrException(email);
        contentRepository.save(Content.of(title, contentImg, member));
    }

    @Transactional
    public ContentDto update(String title, String contentImg, String email, Long contentId){
        Member member = memberOrException(email);
        Content content = contentOrException(contentId);
        checkContentMember(content, member, email, contentId);

        content.setTitle(title);
        content.setContentImg(contentImg);

        return ContentDto.from(contentRepository.save(content));
    }
    @Transactional(readOnly = true)
    public void delete(String email, Long contentId){
        Member member = memberOrException(email);
        Content content = contentOrException(contentId);
        checkContentMember(content, member, email, contentId);
        contentRepository.delete(content);
    }

    @Transactional
    public ContentDto findById(Long contentId){
        Content content = contentOrException(contentId);
        return ContentDto.from(content);
    }

    public Content accessContent(Long contentId, String email){
        Member member = memberOrException(email);
        Content content = contentOrException(contentId);

        //contentProgress 해당되는 memberId랑 contentProgress의 contentId를 찾아서 없으면 생성
        Optional<ContentProgress> optionalContentProgress = contentProgressRepository.findByMemberAndContent_ContentId(member, contentId);
        if(optionalContentProgress.isEmpty()){
            contentProgressRepository.save(ContentProgress.of(member, content));
        }

        //컨텐츠에 속한 모든 학습 항목
        List<Learn> learns = learnRepository.findByContentId(contentId);

        //각 학습 항목에 대해 Learn 항목 존재 여부 체크, null이면 체크
        for(Learn learn : learns){
            Long learnId = learn.getLearnId();
            Long memberId = member.getMemberId();
            boolean isExist = learnCheckRepository.existsByLearnLearnIdAndMemberMemberId(learnId,memberId);
            //선택시 DB에 없을 경우 learnCheck 생성
            if(!isExist){
                learnCheckService.createLearnCheck(learnId, email);
            }
        }
        return content;
    }

    @Transactional(readOnly = true)
    public Page<ContentDto> list(Pageable pageable){
        return contentRepository.findAll(pageable).map(ContentDto::from);
    }
    private Member memberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }

    private Content contentOrException(Long contentId){
        return contentRepository.findById(contentId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND, String.format("%s 번의 게시물이 존재 하지 않습니다.", contentId)));
    }

    private void checkContentMember(Content content, Member member, String email, Long contentId){
        if(!Objects.equals(content.getMember().getMemberId(), member.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s는 %s 의 권한이 없습니다.", email, contentId));
        }
    }

}
