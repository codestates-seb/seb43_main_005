package com.firesuits.server.domain.quiz.service;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.content.repository.ContentRepository;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.domain.quiz.dto.QuizDto;
import com.firesuits.server.domain.quiz.entity.Quiz;
import com.firesuits.server.domain.quiz.repository.QuizRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class QuizService {
    private final QuizRepository quizRepository;
    private final ContentRepository contentRepository;
    private final MemberRepository memberRepository;

    public QuizService(QuizRepository quizRepository, ContentRepository contentRepository, MemberRepository memberRepository){
        this.quizRepository = quizRepository;
        this.contentRepository = contentRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public void create(Long contentId ,String detail, String example, String commentary, boolean correct, String email){
        Member member = memberOrException(email);
        Content content = contentOrException(contentId);
        quizRepository.save(Quiz.of(content, member, detail, example, correct, commentary));
    }

    @Transactional
    public QuizDto update(Long contentId, String detail, String example, String commentary, boolean correct, String email, Long quizId){
        Member member = memberOrException(email);
        Quiz quiz = quizOrException(quizId);
        Content content = contentOrException(contentId);
        checkQuizMember(quiz, member, email, quizId);

        quiz.setContent(content);
        quiz.setDetail(detail);
        quiz.setExample(example);
        quiz.setCommentary(commentary);
        quiz.setCorrect(correct);

        return QuizDto.from(quizRepository.save(quiz));
    }

    public void delete(String email, Long quizId, Long contentId){
        Member member = memberOrException(email);
        Content content = contentOrException(contentId);
        Quiz quiz = quizOrException(quizId);
        checkQuizMember(quiz, member, email, quizId);
        quizRepository.delete(quiz);

    }

    @Transactional
    public QuizDto findById(Long quizId, String email){
        Member member = memberOrException(email);
        Quiz quiz = quizOrException(quizId);
        return QuizDto.from(quiz);
    }

    @Transactional(readOnly = true)
    public Page<QuizDto> list(Pageable pageable, String email){
        Member member = memberOrException(email);
        return quizRepository.findAll(pageable).map(QuizDto::from);
    }
    private Member memberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }

    private Quiz quizOrException(Long quizId){
        return quizRepository.findById(quizId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.QUIZ_NOT_FOUND, String.format("%s 번의 퀴즈가 존재 하지 않습니다.", quizId)));
    }

    private Content contentOrException(Long contentId){
        return contentRepository.findById(contentId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND,String.format("%s 번의 컨텐츠가 존재하지 않습니다.",contentId)));
    }

    private void checkQuizMember(Quiz quiz, Member member, String email, Long quizId){
        if(!Objects.equals(quiz.getMember().getMemberId(), member.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s는 %s 의 권한이 없습니다.", email, quizId));
        }
    }
}