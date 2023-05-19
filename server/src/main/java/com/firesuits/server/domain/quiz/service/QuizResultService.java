package com.firesuits.server.domain.quiz.service;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.domain.quiz.dto.QuizResultDto;
import com.firesuits.server.domain.quiz.entity.Quiz;
import com.firesuits.server.domain.quiz.entity.QuizResult;
import com.firesuits.server.domain.quiz.repository.QuizRepository;
import com.firesuits.server.domain.quiz.repository.QuizResultRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QuizResultService {
    private final QuizRepository quizRepository;
    private final QuizResultRepository quizResultRepository;
    private final MemberRepository memberRepository;

    public QuizResultService(QuizRepository quizRepository, QuizResultRepository quizResultRepository, MemberRepository memberRepository){
        this.quizRepository = quizRepository;
        this.quizResultRepository = quizResultRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public void checkAnswer(Long quizId, boolean answer, boolean result, String email){

        Member member = memberOrException(email);
        Quiz quiz = quizOrException(quizId);

        // quizId와 memberId가 같은 경우는 하나이기 때문에 true 인경우 exist exception 호출
        boolean isExist = quizResultRepository.existsByQuizQuizIdAndMemberMemberId(quizId, member.getMemberId());
        if(isExist){
            throw new BusinessLogicException(ExceptionCode.QUIZRESULT_EXISTS, String.format("%s의 결과가 이미 존재합니다.", quizId));
        }
        else{
            if(answer == quiz.isCorrect()){
                result = true;
            }
            else{
                result = false;
            }
            quizResultRepository.save(QuizResult.of(quiz, member, answer, result));
        }
    }

    // 퀴즈 결과 단건 조회
    @Transactional
    public QuizResultDto findQuizResult(Long quizResultId, Long quizId, String email){
        memberOrException(email);
        quizOrException(quizId);
        QuizResult quizResult = quizResultIdOrException(quizResultId);

        return QuizResultDto.from(quizResult);
    }

    @Transactional(readOnly = true)
    public Page<QuizResultDto> list(Pageable pageable){
        return quizResultRepository.findAll(pageable).map(QuizResultDto::from);
    }

    // 퀴즈 결과의 존재 확인
    private QuizResult quizResultIdOrException(Long quizResultId){
        return quizResultRepository.findById(quizResultId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.QUIZRESULT_NOT_FOUND, String.format("%s의 결과를 찾을 수 없습니다.", quizResultId)));
    }

    // 퀴즈의 존재 확인
    private Quiz quizOrException(Long quizId){
        return quizRepository.findById(quizId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.QUIZ_NOT_FOUND, String.format("%s 번의 퀴즈가 존재 하지 않습니다.", quizId)));
    }

    // 멤버의 존재 확인
    private Member memberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND,String.format("%s 를 찾을 수 없습니다.", email)));
    }

}

