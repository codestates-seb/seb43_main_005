import styled from "styled-components";

// eslint-disable-next-line react/prop-types
function AuthInput({ type, id, placeholder, alertMessage }) {
  return (
    <FormGroup className={alertMessage ? "alert-on" : ""}>
      <div className="input-group">
        <input type={type} id={id} placeholder={placeholder} />
      </div>
      <p>{alertMessage}</p>
    </FormGroup>
  );
}

export default AuthInput;

const FormGroup = styled.div`
  width: 100%;
  input {
    margin-bottom: 10px;
    height: 48px;
    padding: 0px 15px;
    border: 0px;
    border-radius: 10px;
    border: 1px solid black;
    // 이렇게 크기 정하면 되는건지
    font-size: 1em;
  }

  p {
    // 나중에 폰트 바꾸자
    margin-top: 10px;
    display: none;
    font-size: 0.75em;
  }

  &.alert-on {
    p {
      display: block;
      color: #de4f54;
    }
  }
`;
