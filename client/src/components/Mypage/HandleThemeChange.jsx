import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../redux/features/user/themeSlice.js";
import { updateData } from "../../api/apiUtil.js";

export default function handleThemeChange(value) {
  const dispatch = useDispatch();
  const payload = { memberTheme: value };
  dispatch(setTheme(value)); // 테마 변경 액션 디스패치
  updateData(payload, "/members/theme", "patch")
    .then(res => {
      console.log(res);
      alert("테마가 수정되었습니다.");
      // navigate("/");
      // 리덕스 툴킷으로 App.js 의 테마 상태를 바꿔주기
    })
    .catch(error => {
      console.log(error);
      dispatch(setTheme("defaultLight")); // 기본 테마로 변경 액션 디스패치
      alert("테마 변경에 실패했습니다.");
    });
}
