# -- 계정
# INSERT INTO member (created_at, modified_at, email, experience, level, nick_name, password, profile_image, required_experience) VALUES
# (NOW(), NOW(), 'admin@gmail.com', 0, 0, '어드민', '{noop}test', null, 0);
#
# -- roles
# INSERT INTO member_roles(member_member_id, roles) VALUES (1, 'ADMIN'), (1,'USER');
#
# -- 토론 글
# INSERT INTO article(created_at, modified_at, content, title, member_id) VALUES
# ('2023-05-01 15:30:30', NOW(), '<p> 토론 테스트 본문 1 (이미지는 테스트는 직접 업로드해서 하는편이 좋아보여 추가하지 않겠습니다.) </p>', '토론 테스트 타이틀 1', 1),
# ('2023-05-02 15:30:30', NOW(), '<p> 토론 테스트 본문 2 (이미지는 테스트는 직접 업로드해서 하는편이 좋아보여 추가하지 않겠습니다.) </p>', '토론 테스트 타이틀 2', 1),
# ('2023-05-03 15:30:30', NOW(), '<p> 토론 테스트 본문 3 (이미지는 테스트는 직접 업로드해서 하는편이 좋아보여 추가하지 않겠습니다.) </p>', '토론 테스트 타이틀 3', 1),
# ('2023-05-04 15:30:30', NOW(), '<p> 토론 테스트 본문 4 (이미지는 테스트는 직접 업로드해서 하는편이 좋아보여 추가하지 않겠습니다.) </p>', '토론 테스트 타이틀 4', 1),
# ('2023-05-05 15:30:30', NOW(), '<p> 토론 테스트 본문 5 (이미지는 테스트는 직접 업로드해서 하는편이 좋아보여 추가하지 않겠습니다.) </p>', '토론 테스트 타이틀 5', 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 테스트 본문 6 (이미지는 테스트는 직접 업로드해서 하는편이 좋아보여 추가하지 않겠습니다.) </p>', '토론 테스트 타이틀 6', 1),
# ('2023-05-07 15:30:30', NOW(), '<p> 토론 테스트 본문 7 (이미지는 테스트는 직접 업로드해서 하는편이 좋아보여 추가하지 않겠습니다.) </p>', '토론 테스트 타이틀 7', 1),
# ('2023-05-08 15:30:30', NOW(), '<p> 토론 테스트 본문 8 (이미지는 테스트는 직접 업로드해서 하는편이 좋아보여 추가하지 않겠습니다.) </p>', '토론 테스트 타이틀 8', 1),
# ('2023-05-09 15:30:30', NOW(), '<p> 토론 테스트 본문 9 (이미지는 테스트는 직접 업로드해서 하는편이 좋아보여 추가하지 않겠습니다.) </p>', '토론 테스트 타이틀 9', 1),
# ('2023-05-10 15:30:30', NOW(), '<p> 토론 테스트 본문 10 (이미지는 테스트는 직접 업로드해서 하는편이 좋아보여 추가하지 않겠습니다.) </p>', '토론 테스트 타이틀 10', 1);
#
# -- 토론 댓글
# INSERT INTO article_comment(created_at, modified_at, content, article_id, member_id) VALUES
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 10, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 10, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 9, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 9, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 9, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 5, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 5, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 5, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 5, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 2, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 2, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 2, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 2, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 2, 1),
# ('2023-05-06 15:30:30', NOW(), '<p> 토론 댓글 테스트 </p>' , 2, 1);