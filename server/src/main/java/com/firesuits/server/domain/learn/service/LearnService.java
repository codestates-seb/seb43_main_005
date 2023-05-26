package com.firesuits.server.domain.learn.service;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.content.repository.ContentRepository;
import com.firesuits.server.domain.learn.dto.LearnDto;
import com.firesuits.server.domain.learn.entity.Learn;
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
import java.util.Objects;

@Service
public class LearnService {
    private final MemberRepository memberRepository;
    private final LearnRepository learnRepository;
    private final ContentRepository contentRepository;

    public LearnService(MemberRepository memberRepository, LearnRepository learnRepository, ContentRepository contentRepository) {
        this.memberRepository = memberRepository;
        this.learnRepository = learnRepository;
        this.contentRepository = contentRepository;
    }

    @Transactional
    public void create(String title, String content, String email, Long contentId){
        Member member = memberOrException(email);
        Content contentBoard = contentOrException(contentId);
        learnRepository.save(Learn.of(title, content, member, contentBoard));
    }

    @Transactional
    public LearnDto update(String title, String content, String email, Long learnId){
        Member member = memberOrException(email);
        Learn learn = learnOrException(learnId);
        checkLearnMember(learn, member,email,learnId);
        learn.setTitle(title);
        learn.setContent(content);
        return LearnDto.from(learnRepository.save(learn));
    }
    @Transactional
    public void delete(String email, Long contentId, Long learnId){
        Member member = memberOrException(email);
        Learn learn = learnOrException(learnId);
        checkLearnMember(learn, member,email,learnId);
        learnRepository.delete(learn);
    }
    @Transactional(readOnly = true) //transaction 읽기만 가능하게 하여 성능 향상
    public LearnDto findById(Long contentId, Long learnId, String email){
        Member member = memberOrException(email);
        Learn learn = learnOrException(learnId);
        Content contentBoard = contentOrException(contentId);

        Learn checkLearn = learnRepository.findByLearnAndContentAndLearn(learn.getLearnId(), contentBoard)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.INVALID_REQUEST));
        return LearnDto.from(checkLearn);
    }
    @Transactional(readOnly = true)
    public Page<LearnDto> list(Long contentId, String email, Pageable pageable){
        Member member = memberOrException(email);
        Content contentBoard = contentOrException(contentId);

        List<Learn> learn = learnRepository.findByContentId(contentId);
        if(learn.isEmpty()){
            throw new BusinessLogicException(ExceptionCode.LEARN_NOT_FOUND);
        }
        return learnRepository.findAllByContent(contentBoard.getContentId(), pageable).map(LearnDto::from);
    }

    //회원 존재 여부
    private Member memberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow( () ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }
    //학습 내용 존재 여부
    private Learn learnOrException(Long learnId){
        return learnRepository.findById(learnId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.LEARN_NOT_FOUND, String.format("%s 번의 학습 내용이 존재 하지 않습니다.", learnId)));
    }
    //콘텐츠보드 존재 여부
    private Content contentOrException(Long contentId){
        return contentRepository.findById(contentId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND, String.format("%s 번의 콘첸츠가 존재 하지 않습니다.", contentId)));
    }
    //학습 내용 권한 여부
    private void checkLearnMember(Learn learn, Member member, String email, Long learnId) {
        if (!Objects.equals(learn.getMember().getMemberId(), member.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 는 %s 학습에 대한 권한을 가지고 있지 않습니다.", email, learnId));
        }
    }
}
