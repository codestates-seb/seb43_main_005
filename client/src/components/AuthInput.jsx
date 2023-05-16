import styled from "styled-components";

// eslint-disable-next-line react/prop-types
function AuthInput({ type, id, placeholder, alertMessage, value }) {
  return (
    <FormGroup className={alertMessage ? "alert-on" : ""}>
      <div className="input-group">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          onChange={e => {
            value(e.target.value);
          }}
        />
      </div>
      <p>{alertMessage}</p>
    </FormGroup>
  );
}

export default AuthInput;

const FormGroup = styled.div`
  input {
    width: 100%;
    margin-bottom: 8px;
    height: 48px;
    padding: 0px 15px;
    border: 0px;
    border-radius: 10px;
    border: 1px solid black;
    font-size: 1em;
    box-sizing: border-box;
  }

  p {
    // 나중에 폰트 바꾸자
    margin-top: 10px;
    display: none;
    font-size: 0.75em;
    position: absolute;
  }

  &.alert-on {
    p {
      display: block;
      color: #de4f54;
    }
  }
`;
