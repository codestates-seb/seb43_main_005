package com.firesuits.server.domain.quiz.service;

import com.firesuits.server.domain.quiz.dto.QuizResultDto;
import com.firesuits.server.domain.quiz.entity.Quiz;
import com.firesuits.server.domain.quiz.entity.QuizResult;
import com.firesuits.server.domain.quiz.repository.QuizRepository;
import com.firesuits.server.domain.quiz.repository.QuizResultRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuizResultService {
    private final QuizRepository quizRepository;
    private final QuizResultRepository quizResultRepository;

    public QuizResultService(QuizRepository quizRepository, QuizResultRepository quizResultRepository){
        this.quizRepository = quizRepository;
        this.quizResultRepository = quizResultRepository;
    }

    @Transactional
    public void checkAnswer(Long quizId, Integer answer, Boolean result){

    // 퀴즈가 존재하는지 체크
        Quiz quiz = null;
    // 정답 체크하는 로직 필요

        quizResultRepository.save(QuizResult.of(quiz, answer, result));
    }

    // 퀴즈 결과 조회
    @Transactional
    public QuizResultDto findQuizResult(Long quizResultId){
        QuizResult quizResult = quizResultIdOrException(quizResultId);
        return QuizResultDto.from(quizResult);
    }

    private QuizResult quizResultIdOrException(Long quizResultId){
        return quizResultRepository.findById(quizResultId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.QUIZRESULT_NOT_FOUND, String.format("%s의 결과를 찾을 수 없습니다.", quizResultId)));
    }




}
