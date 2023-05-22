package com.firesuits.server.domain.member.service;

import com.firesuits.server.domain.article.dto.ArticleCommentDto;
import com.firesuits.server.domain.article.repository.ArticleCommentRepository;
import com.firesuits.server.domain.member.dto.MemberDto;
import com.firesuits.server.domain.member.entity.Attendance;
import com.firesuits.server.domain.member.entity.Member;
import com.firesuits.server.domain.member.entity.MemberMbti;
import com.firesuits.server.domain.member.entity.MemberTheme;
import com.firesuits.server.domain.member.repository.MemberRepository;
import com.firesuits.server.global.auth.utils.CustomAuthorityUtils;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ArticleCommentRepository articleCommentRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;

    public MemberService(MemberRepository memberRepository, ArticleCommentRepository articleCommentRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils customAuthorityUtils) {
        this.memberRepository = memberRepository;
        this.articleCommentRepository = articleCommentRepository;
        this.passwordEncoder = passwordEncoder;
        this.customAuthorityUtils = customAuthorityUtils;
    }

    //회원가입
    public MemberDto join(String email, String password, String checkPassword, String name, MemberMbti memberMbti){
        memberRepository.findByEmail(email).ifPresent(it -> {
            throw new BusinessLogicException(ExceptionCode.DUPLICATED_EMAIL, String.format("%s is duplicated", email));
        });
        if(!password.equals(checkPassword)){
            throw new BusinessLogicException(ExceptionCode.PASSWORD_MISMATCH, "비밀번호가 일치하지 않습니다.");
        }

        if (memberMbti == null){
            memberMbti = MemberMbti.테스트전;
        }
        MemberTheme memberTheme = MemberTheme.defaultLight;
        Member savedMember = saveMember(email, name, password, memberMbti, memberTheme);
        defaultImageSet(savedMember);
        setRoles(savedMember, email);
        return MemberDto.from(savedMember);
    }

    //프로필 이미지 수정
    public MemberDto updateProfileImage(String email, String profileImage){
        Member member = memberOrException(email);
        member.setProfileImage(profileImage);
        return MemberDto.from(memberRepository.save(member));
    }

    //닉네임 변경
    public MemberDto updateNickName(String email, String nickName){
        Member member = memberOrException(email);
        member.setNickName(nickName);
        return MemberDto.from(memberRepository.save(member));
    }

    //프로필 이미지, 닉네임 동시
    public MemberDto update(String email, Optional<String> nickName, Optional<String> profileImage){
        Member member = memberOrException(email);
        if (profileImage.isPresent() && !profileImage.get().isEmpty()) {
            member.setProfileImage(profileImage.get());
        }
        if (nickName.isPresent() && !nickName.get().isEmpty()) {
            member.setNickName(nickName.get());
        }
        return MemberDto.from(memberRepository.save(member));
    }

    //Mbti 수정
    public MemberDto updateMemberMbti(String email, MemberMbti memberMbti){
        Member member = memberOrException(email);
        if (member.getMemberMbti().equals(MemberMbti.테스트전) && !memberMbti.equals(MemberMbti.테스트전)){
            member.addExperience(100);
        }
        member.setMemberMbti(memberMbti);
        memberRepository.save(member);
        return MemberDto.from(memberRepository.save(member));
    }

    //테마 수정
    public void updateMemberTheme(String email, MemberTheme memberTheme){
        Member member = memberOrException(email);
        member.setMemberTheme(memberTheme);
        memberRepository.save(member);
        MemberDto.from(memberRepository.save(member));
    }

    //비밀번호 수정
    public void updatePassword(String email, String currentPassword, String newPassword, String checkNewPassword){
        Member member = memberOrException(email);

        if(!passwordEncoder.matches(currentPassword, member.getPassword())){
            throw new BusinessLogicException(ExceptionCode.WRONG_PASSWORD, "현재 비밀번호가 일치하지 않습니다.");
        }
        if(!newPassword.equals(checkNewPassword)){
            throw new BusinessLogicException(ExceptionCode.PASSWORD_MISMATCH, "새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
        }
        member.setPassword(passwordEncoder.encode(newPassword));
        memberRepository.save(member);
        MemberDto.from(member);
    }

    //회원 탈퇴
    public void delete(String email){
        Member member = memberOrException(email);
        memberRepository.delete(member);
    }

    //내가 작성한 토론 댓글
    @Transactional(readOnly = true)
    public Page<ArticleCommentDto> myCommentList(String email, Pageable pageable, String sort){
        Member member = memberOrException(email);
        if (sort != null) {
            if (sort.equals("createdAt")) {
                pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createdAt").descending());
            } else if (sort.equals("likes")) {
                pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("commentLikes").descending().and(Sort.by("createdAt").ascending()));
            }
        } else {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createdAt").ascending());
        }
        return articleCommentRepository.findAllByMember(member, pageable).map(ArticleCommentDto::from);
    }

    //멤버 정보
    public MemberDto getMemberInfo(String email){
        Member member = memberOrException(email);
        return MemberDto.from(member);
    }

    //출석체크
    @Transactional
    public void checkIn(String email){
        Member member = memberOrException(email);
        LocalDate today = LocalDate.now();

        boolean alreadyCheckIn = member.getAttendances().stream()
                .anyMatch(attendance ->  attendance.getCheckDate().equals(today));

        if (alreadyCheckIn){
            throw new BusinessLogicException(ExceptionCode.ALREADY_CHECKED_IN, "오늘은 이미 출석체크를 하였습니다.");
        }

        Attendance attendance = new Attendance();
        attendance.setMember(member);
        attendance.setCheckDate(today);
        member.getAttendances().add(attendance);
        member.addExperience(20);
        memberRepository.save(member);
    }

    //출석체크한 날짜
    @Transactional(readOnly = true)
    public List<LocalDate> getCheckInDates(String email){
        Member member = memberOrException(email);

        return member.getAttendances().stream()
                .map(Attendance::getCheckDate)
                .collect(Collectors.toList());
    }

    //Oauth2 유저 회원가입
    public MemberDto oauthJoin(String email, String name, MemberMbti memberMbti, MemberTheme memberTheme){
        Optional<Member> existingMemberOptional = memberRepository.findByEmail(email);
        Member savedMember;
        if (existingMemberOptional.isPresent()) {
            savedMember = existingMemberOptional.get();
        } else {
            String password = UUID.randomUUID().toString();
            savedMember = saveMember(email, name, password, memberMbti, memberTheme);
        }
        defaultImageSet(savedMember);
        setRoles(savedMember, email);
        return MemberDto.from(savedMember);
    }

    //멤버 경험치 수동
    @Transactional
    public void addExperience(String email, int experience){
        Member member = memberOrException(email);
        member.addExperience(experience);
    }

    private Member memberOrException(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 를 찾을 수 없습니다.", email)));
    }

    private Member saveMember(String email, String name, String password, MemberMbti memberMbti, MemberTheme memberTheme){
        Member member = Member.of(email, name, passwordEncoder.encode(password), memberMbti, memberTheme);
        if (!member.getMemberMbti().equals(MemberMbti.테스트전)){
            member.addExperience(100);
        }
        return memberRepository.save(member);
    }

    private void defaultImageSet(Member member){
        if (member.getProfileImage() == null || member.getProfileImage().isEmpty()){
            member.setProfileImage("https://gonue-bucket.s3.ap-northeast-2.amazonaws.com/dbcef092-2952-4b4e-b449-1a312ff668da_basic_profile.png");
        }
    }

    private void setRoles(Member member, String email){
        List<String> roles = customAuthorityUtils.createRoles(email);
        member.setRoles(roles);
    }
}
