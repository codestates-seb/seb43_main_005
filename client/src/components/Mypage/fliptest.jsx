import React, { useState } from "react";
import styled from "styled-components";

export default function Fliptest() {
  const [cardData, setCardData] = useState([
    { id: 1, isFlipped: false },
    { id: 2, isFlipped: false },
    { id: 3, isFlipped: false },
    // 나머지 카드들의 정보도 추가
  ]);

  const handleCardHover = id => {
    const updatedCardData = cardData.map(card =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCardData(updatedCardData);
  };

  const handleCardLeave = id => {
    const updatedCardData = cardData.map(card =>
      card.id === id ? { ...card, isFlipped: false } : card
    );
    setCardData(updatedCardData);
  };

  return (
    <>
      <FlipBox>
        {cardData.map(card => (
          <CardWrapper key={card.id}>
            <FlipCard
              onMouseEnter={() => handleCardHover(card.id)}
              onMouseLeave={() => handleCardLeave(card.id)}
              flip={card.isFlipped}>
              <FrontCard className="front"></FrontCard>
              <BackCard className="back"></BackCard>
            </FlipCard>
          </CardWrapper>
        ))}
      </FlipBox>
    </>
  );
}

const FlipBox = styled.div`
  width: 150px;
  height: 200px;
  perspective: 500px;
  display: flex;
  flex-wrap: wrap;
`;

const CardWrapper = styled.div`
  width: 150px;
  height: 200px;
  margin: 5px;
  position: relative;
  transform-style: preserve-3d;
`;

const FlipCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  transform: ${props => (props.flip ? "rotateX(-180deg)" : "rotateX(0)")};
`;

const FrontCard = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #828282;
  background-color: azure;
  font-size: 35px;
  backface-visibility: hidden;
  transition: 0.5s;
  position: absolute;
  transform: rotateX(0deg);
  background-color: wheat;
`;

const BackCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: teal;
  position: absolute;
  transform: rotateX(180deg);
`;
