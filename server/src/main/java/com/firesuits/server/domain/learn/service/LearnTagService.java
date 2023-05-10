package com.firesuits.server.domain.learn.service;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.content.repository.ContentRepository;
import com.firesuits.server.domain.learn.dto.LearnTagDto;
import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.learn.entity.LearnTag;
import com.firesuits.server.domain.learn.repository.LearnRepository;
import com.firesuits.server.domain.learn.repository.LearnTagRepository;
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
public class LearnTagService {
    private final MemberRepository memberRepository;
    private final LearnRepository learnRepository;
    private final LearnTagRepository learnTagRepository;
    private final ContentRepository contentRepository;

    public LearnTagService(MemberRepository memberRepository, LearnRepository learnRepository, LearnTagRepository learnTagRepository, ContentRepository contentRepository) {
        this.memberRepository = memberRepository;
        this.learnRepository = learnRepository;
        this.learnTagRepository = learnTagRepository;
        this.contentRepository = contentRepository;
    }

    @Transactional
    public void create(String name, Long learnId, Long contentId, String email){
        Learn learn = learnOrException(learnId);
        Member member = memberOrException(email);
        Content contentBoard = contentOrException(contentId);
        learnTagRepository.save(LearnTag.of(member, learn, name,contentBoard));
    }

    @Transactional
    public LearnTagDto update(String name, String email, Long learnId, Long contentId, Long learnTagId){
        LearnTag learnTag = learnTagOrException(learnTagId);
        Learn learn = learnOrException(learnId);
        Member member = memberOrException(email);
        Content contentBoard = contentOrException(contentId);
        checkLearnTagMember(learnTag,member,email,learnTagId);
        checkLearnTagContent(learnTag,contentBoard,contentId,learnTagId);
        checkLearnTagLearn(learnTag, learn, learnId, learnTagId);
        learnTag.setName(name);
        return LearnTagDto.from(learnTagRepository.save(learnTag));
    }

    @Transactional
    public void delete(String email, Long learnId, Long contentId, Long learnTagId){
        LearnTag learnTag = learnTagOrException(learnTagId);
        Learn learn = learnOrException(learnId);
        Member member = memberOrException(email);
        Content contentBoard = contentOrException(contentId);
        checkLearnTagMember(learnTag,member,email,learnTagId);
        checkLearnTagContent(learnTag,contentBoard,contentId,learnTagId);
        checkLearnTagLearn(learnTag, learn, learnId, learnTagId);
        learnTagRepository.delete(learnTag);
    }
    @Transactional(readOnly = true) //transaction 읽기만 가능하게 하여 성능 향상
    public LearnTagDto findById(Long contentId, Long learnId, Long learnTagId){
        Learn learn = learnOrException(learnId);
        Content contentBoard = contentOrException(contentId);
        LearnTag learnTag = learnTagOrException(learnTagId);
        return LearnTagDto.from(learnTag);
    }
//    @Transactional(readOnly = true)
//    public Page<LearnTagDto> list(Long contentId, Long learnId, Pageable pageable){
//        Content contentBoard = contentOrException(contentId);
//        Learn learn = learnOrException(learnId);
//        return learnTagRepository.findAllByContentLearn(contentBoard,learn, pageable).map(LearnTagDto::from);
//    }

    //회원 존재 여부
    private Member memberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow( () ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }
    //학습 내용 존재 여부
    private Learn learnOrException(Long learnId){
        return learnRepository.findById(learnId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.LEARN_NOT_FOUND, String.format("%s 번의 학습 내용을 찾을 수 없습니다..", learnId)));
    }
    //콘텐츠보드 존재 여부
    private Content contentOrException(Long contentId){
        return contentRepository.findById(contentId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND, String.format("%s 번의 콘첸츠를 찾을 수 없습니다.", contentId)));
    }
    private LearnTag learnTagOrException(Long learnTagId){
        return learnTagRepository.findById(learnTagId). orElseThrow(()->
                new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND, String.format("%s 번의 소제목을 찾을 수 없습니다.", learnTagId)));
    }

    private void checkLearnTagMember(LearnTag learnTag, Member member, String email, Long learnTagId) {
        if (!Objects.equals(learnTag.getMember().getMemberId(), member.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 는 %s 소제목에 대한 권한을 가지고 있지 않습니다.", email, learnTagId));
        }
    }
    private void checkLearnTagContent(LearnTag learnTag, Content content, Long contentId, Long learnTagId) {
        if (!Objects.equals(learnTag.getContentBoard().getContentId(), content.getContentId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 번의 소제목에 대한 %s 번의 요청이 잘못 됐습니다.", contentId, learnTagId));
        }
    }

    private void checkLearnTagLearn(LearnTag learnTag, Learn learn, Long learnId, Long learnTagId){
        if (!Objects.equals(learnTag.getLearn().getLearnId(), learn.getLearnId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST, String.format("%s 번의 소제목에 대한 %s 번의 요청이 잘못 됐습니다.", learnId, learnTagId));
        }
    }
}
