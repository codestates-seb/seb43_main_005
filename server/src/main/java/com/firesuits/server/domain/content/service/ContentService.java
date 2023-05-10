package com.firesuits.server.domain.content.service;

import com.firesuits.server.domain.content.dto.ContentDto;
import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.content.repository.ContentRepository;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.Objects;
import java.util.Optional;

@Service
public class ContentService {
    private final ContentRepository contentRepository;
    private final MemberRepository memberRepository;

    public ContentService(ContentRepository contentRepository, MemberRepository memberRepository){
        this.contentRepository = contentRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public void create(String title, String contentImg, BigDecimal progress, String email){
        Member member = memberOrException(email);
        contentRepository.save(Content.of(title, contentImg, progress, member));
    }

    @Transactional
    public ContentDto update(String title, String contentImg, BigDecimal progress, String email, Long contentId){
        Member member = memberOrException(email);
        Content content = contentOrException(contentId);
        checkContentMember(content, member, email, contentId);
        if(title != null) {
            content.setTitle(title);
        }
        if(contentImg != null){
            content.setContentImg(contentImg);
        }
        if(progress != null){
            content.setProgress(progress);
        }

        return ContentDto.from(contentRepository.save(content));
    }

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
