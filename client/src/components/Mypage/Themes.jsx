import styled from "styled-components";

export default function Themes() {
  return (
    <>
      <ThemeBox className="ThemeBox">
        <div>Lv.1</div>
        <Theme>
          <ThemeImg></ThemeImg>
          <ThemeImg></ThemeImg>
        </Theme>
      </ThemeBox>
      <ThemeBox className="ThemeBox">
        <div>Lv.2</div>
        <Theme>
          <ThemeImg></ThemeImg>
          <ThemeImg></ThemeImg>
        </Theme>
      </ThemeBox>
      <ThemeBox className="ThemeBox">
        <div>Lv.3</div>
        <Theme>
          <ThemeImg></ThemeImg>
          <ThemeImg></ThemeImg>
        </Theme>
      </ThemeBox>
      <ThemeBox className="ThemeBox">
        <div>Lv.4</div>
        <Theme>
          <ThemeImg></ThemeImg>
          <ThemeImg></ThemeImg>
        </Theme>
      </ThemeBox>
      <ThemeBox className="ThemeBox">
        <div>Lv.5</div>
        <Theme>
          <ThemeImg></ThemeImg>
          <ThemeImg></ThemeImg>
        </Theme>
      </ThemeBox>
      <ThemeBox className="ThemeBox">
        <div>Lv.6</div>
        <Theme>
          <ThemeImg></ThemeImg>
          <ThemeImg></ThemeImg>
        </Theme>
      </ThemeBox>
    </>
  );
}

const ThemeBox = styled.div``;
const Theme = styled.div`
  height: 280px;
  background-color: ${props => props.theme.white};
  border: ${props => props.theme.borderBold};
  border-radius: 20px;
  margin: 10px 20px 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ThemeImg = styled.div`
  width: 124px;
  height: 124px;
  background-color: ${props => props.theme.bg};
  background-image: url();
  border: 1px solid ${props => props.theme.main};
  border-radius: 50%;
  margin: 34px;
  & :hover {
    transform: scale(1.1);
    transition-duration: 0.5s;
  }
`;
