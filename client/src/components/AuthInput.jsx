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
  padding: 0px;
  border: none;

  input {
    width: 445px;
    height: 48px;
  }
  p {
    display: none;
  }

  &.alert-on {
    p {
      display: block;
      color: #de4f54;
    }
  }
`;
