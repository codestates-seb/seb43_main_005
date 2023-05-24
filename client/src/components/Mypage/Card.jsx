import styled from "styled-components";

export default function Card({ teammateInfo }) {
  return (
    <>
      <CardBox className="CardBox">
        <ImgContainer></ImgContainer>
        <InfoContainer>
          <div className="above">
            <div>
              <p>{teammateInfo.name}</p>
              <p>{teammateInfo.nameENG}</p>
            </div>
            <div className="SVGbox">
              <svg
                width="130"
                height="20"
                viewBox="0 0 130 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <line
                  y1="9.5"
                  x2="130"
                  y2="9.5"
                  stroke="#BDBDBD"
                  strokeDasharray="2 2"
                />
                <rect x="56" width="18" height="19.5" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1">
                    <use
                      xlinkHref="#image0_621_1701"
                      transform="matrix(0.0108333 0 0 0.01 -0.0416667 0)"
                    />
                  </pattern>
                  <image
                    id="image0_621_1701"
                    width="100"
                    height="100"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </div>
            <div>
              <p>{teammateInfo.febe}</p>
              <p>{teammateInfo.febeENG}</p>
            </div>
          </div>
          <div className="below">
            <div className="QRBox"></div>
            <div className="textBox">
              <p>{teammateInfo.job}</p>
              <p>{teammateInfo.work}</p>
            </div>
          </div>
        </InfoContainer>
      </CardBox>
    </>
  );
}
const CardBox = styled.div`
  background-color: ${props => props.theme.white};
  border: ${props => props.theme.borderBold};
  clip-path: polygon(100% 10%, 100% 90%, 90% 100%, 0 100%, 0 0, 90% 0);
  display: flex;
`;
const ImgContainer = styled.div`
  width: 150px;
  height: 200px;
  border-radius: 10px;
  border: ${props => props.theme.borderBold};
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 1;
  /* margin: 8px; */
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  flex-shrink: 2;
`;
