package com.firesuits.server.domain.progress.service;

import com.firesuits.server.domain.content.entity.Content;
import com.firesuits.server.domain.content.repository.ContentRepository;
import com.firesuits.server.domain.learn.entity.Learn;
import com.firesuits.server.domain.progress.entity.Progress;
import com.firesuits.server.domain.learn.repository.LearnRepository;
import com.firesuits.server.domain.progress.repository.ProgressRepository;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.domain.quiz.entity.Quiz;
import com.firesuits.server.domain.quiz.repository.QuizRepository;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProgressService {
    private final MemberRepository memberRepository;
    private final ContentRepository contentRepository;
    private final LearnRepository learnRepository;
    private final QuizRepository quizRepository;
    private final ProgressRepository progressRepository;

    public ProgressService(MemberRepository memberRepository, ContentRepository contentRepository, LearnRepository learnRepository, QuizRepository quizRepository, ProgressRepository progressRepository) {
        this.memberRepository = memberRepository;
        this.contentRepository = contentRepository;
        this.learnRepository = learnRepository;
        this.quizRepository = quizRepository;
        this.progressRepository = progressRepository;
    }
    //퀴즈 없이 학습내용만 있는 경우
    @Transactional
    public void createLearn(String email, Long contentId, Long learnId) {
        Member member = memberOrException(email);
        Content contentBoard = contentOrException(contentId);
        Learn learn = learnOrException(learnId);

        progressRepository.findByMemberAndLearn(member, learn).ifPresent(it ->{throw new BusinessLogicException(ExceptionCode.ALREADY_LEARN_COMPLETED, String.format("%s 는 이미 %s 학습의 완료를 눌렀습니다.", email, learnId));
        });


//        //레포지토리에서 content에서 해당되는 learn을 찾아야함
        List<Learn> saved = learnRepository.findByContentId(contentId);
//        Integer progressCount = (Integer) saved.size();
//        //Integer progressCount = (Integer) learnRepository.findByContent(contentId).size();

        Integer progressCount = learnRepository.countByContentId(contentId);

        long completedCount = saved.stream()
                .filter(Learn::isCompleted)
                        .count();

        if(completedCount != 0){
            progressCount = progressCount / (int) (completedCount * 100);
        }else
        progressCount = 0;



//        if(learn.isCompleted() ) {
//            //learn 진행률이 몇개인지 개수 구하기
//            long completedCount = contentBoard.getLearns().stream()
//                    .filter(Learn::isCompleted)
//                    .count();
//            if (completedCount == 0) {
//                progressCount = 0;
//            } else {
//                //진행률 계산
//                progressCount = progressCount / (int) (completedCount * 100);
//            }
//        }

        progressRepository.save(Progress.of(progressCount,member,contentBoard, learn));
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
    //퀴즈 존재 여부
    private Quiz quizOrException(Long quizId){
        return quizRepository.findById(quizId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.QUIZ_NOT_FOUND, String.format("%s 번의 퀴즈가 존재 하지 않습니다.", quizId)));
    }
}
