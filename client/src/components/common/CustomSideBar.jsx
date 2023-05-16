import React from "react";
import styled from "styled-components";

function CustomSideBar(props) {
  return (
    <SideBarContainer>
      <p>안녕</p>
    </SideBarContainer>
  );
}

export default CustomSideBar;

const SideBarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 250px;
  border: 5px solid blue;
`;
