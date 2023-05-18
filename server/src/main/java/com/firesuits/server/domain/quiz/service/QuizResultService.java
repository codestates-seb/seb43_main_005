package com.firesuits.server.domain.quiz.service;

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
    public void checkAnswer(Long quizId, boolean answer,  boolean result, String email){
    // 멤버의 존재 여부를 체크
        Member member = memberOrException(email);
    // 퀴즈가 존재하는지 체크
        Quiz quiz = quizOrException(quizId);

    // 정답 체크하는 로직 필요
        if(answer == quiz.isCorrect()){
            result = true;
        }
        else{
            result = false;
        }
        quizResultRepository.save(QuizResult.of(quiz, member, answer, result));
    }

    // 퀴즈 결과 조회
    @Transactional
    public QuizResultDto findQuizResult(Long quizResultId, Long quizId){
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
