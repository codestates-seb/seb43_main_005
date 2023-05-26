import { updateData } from "../../api/apiUtil";
import { useNavigate } from "react-router-dom";

// Themes.jsx, Dialog 에 적용됨

  // alert 를 테마를 적용하시겠습니까? 하고 yes 면 patch 적용하고 리다이렉션하는 걸로 바꾸기
  
export default ThemeApply(){
  
  const navigate = useNavigate();

const handleThemeChange = value => {
  const payload = { memberTheme: value };
  updateData(payload, "/members/theme", "patch").then(res => {
    console.log(res);
    alert("테마 수정됨.");
    navigate("/");
  });

};

}