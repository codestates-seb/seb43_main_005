import React, { useState } from "react";
import useInput from "../../hooks/useInput";

export default function CategoryInput() {
  const [showInput, setShowInput] = useState(false);
  const [category, setCategory] = useState([]);
  const [value, reset] = useInput("");

  // 처음에 useEffect로 카테고리 목록들을 가져와서 set update

  // 카테고리가 추가됐들 때
  const addCategory = () => {
    value.value.trim() !== "" && setCategory([...category, value.value]);
    reset();
  };

  return (
    <div>
      <select defaultValue="default">
        <option value="default" disabled hidden>
          === 선택 ===
        </option>
        {category.map((el, i) => (
          <option key={i} value={el}>
            {el}
          </option>
        ))}
      </select>
      <button onClick={() => setShowInput(prev => !prev)}>
        {showInput ? "닫기" : "카테고리 추가"}
      </button>
      {showInput && (
        <>
          <input
            {...value}
            onKeyUp={e => e.code === "Enter" && addCategory()}
            type="text"
            placeholder="추가할 카테고리를 입력하세요"
          />
          <button onClick={addCategory}>추가</button>
        </>
      )}
    </div>
  );
}
