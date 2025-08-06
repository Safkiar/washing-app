
import { useState } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 20px;
  padding: 8px;
  background: #ffffffff;
 
`

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
`


export const CardImage = styled.img`

  height: 100%;
  margin: 0 auto;
  object-fit: contain;
`;

const Title = styled.h3`
margin-bottom: 32px;
margin-top: 8px;
`

const Description = styled.p`
font-size: 12px;
color:grey;
`

const Info = styled.b`
color: black;
`

const EnClass = styled.div`
margin: 16px 0;
display: flex;
font-size: 12px;
color: grey;
gap: 8px;
`
const ClassDiv = styled.div`
background-color: #009949;
width: 54px;
padding-left: 8px;
height: 20px;

  display: inline-flex;
  align-items: center;
  position: relative;
  color: #fff;

  font-size: 12px;
  clip-path: polygon(
    0 0,
    88% 0,
    100% 50%,
    88% 100%,
    0 100%
  );
`
const Zloty = styled.span`
  font-size: 38px;
  font-weight: 600;
  line-height: 1.2;
`;

const Grosz = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-left: 2px;
  height:18px;
  padding-top: 2px;
`;

const Zl = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
  align-self: flex-end;
`;

const GroszContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const PriceInfo = styled.div`
    margin-bottom: 12px;
`
const PriceDate = styled.p`
color: grey;
font-size: 14px;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2px;
`;

const Rates = styled.div`
  margin-bottom: 16px;
`;
const CardButton = styled.button`
  width: auto;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  max-width: 140px;
  padding: 4px 32px;
  letter-spacing: 2px;
  border-radius: 24px;
  margin-bottom: 16px;
  color: white;
  background: ${({ $isSelected }) => ($isSelected ? "#1c1c1c" : "#1428A0")};
`;

function formatPrice(price) {
  const parts = Number(price).toFixed(2).split(".");
  return {
    zlote: parts[0],
    grosze: parts[1],
  };
}

function breakAfterSecondSpace(text) {
  const first = text.indexOf(' ');
  if (first === -1) return text;
  const second = text.indexOf(' ', first + 1);
  if (second === -1) return text;
  return (
    <>
      {text.slice(0, second)}
      <br />
      {text.slice(second + 1)}
    </>
  );
}


function Card({ machine,showRate, isSelected, onSelect   }) {
    const { zlote, grosze } = formatPrice(machine.price);

  return (
    <CardContainer>
      <ImageContainer>
      <CardImage src={machine.img} alt={machine.name} />
      </ImageContainer>

      <Title>{breakAfterSecondSpace(machine.name)}</Title>
      <Description>Pojemność (kg): <Info>{machine.capacity}</Info></Description>
      <Description>Wymiary (GxSxW): <Info>{machine.dimensions}</Info></Description>
      <Description>Funkcje: <Info>{machine.functions.join(", ")}</Info></Description>
      <EnClass>Klasa energetyczna
        <ClassDiv>
    {machine.efficiency}
        </ClassDiv>
    </EnClass>

<PriceInfo>
  
        <PriceDate>
          Cena obowiązuje: {machine.price_date}
        </PriceDate>
      <PriceContainer>
     <Zloty>{zlote}</Zloty>
     <GroszContainer>
          <Grosz>{grosze}</Grosz>
             <Zl>zł</Zl>
     </GroszContainer>
      </PriceContainer>
</PriceInfo>
    {showRate && (
          <Rates>
            {machine.i_price}
          </Rates>
        )}
     <CardButton onClick={onSelect} $isSelected={isSelected}>
      {isSelected ? "WYBRANE" : "WYBIERZ"}
    </CardButton>
    </CardContainer>
  );
}
export default Card;