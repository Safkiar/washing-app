
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 20px;
  border: 2px solid red;
  padding: 8px;
`

export const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
  background: #f6f6f6;
  border: 2px solid red;
  padding:
`;

const Title = styled.h4`
border:2px solid red;
margin-bottom: 16px;
margin-top: 8px;
`

const Description = styled.p`
border:2px solid red;
`

const EnClass = styled.p`
border:2px solid red;
margin: 8px 0;
display: flex;
gap: 8px;
`
const ClassDiv = styled.div`
background-color: #009949;
width: 64px;
padding-left: 8px;

  display: inline-flex;
  align-items: center;
  position: relative;
  color: #fff;
  font-weight: bold;
  font-size: 1.4rem;
  clip-path: polygon(
    0 0,
    85% 0,
    100% 50%,
    85% 100%,
    0 100%
  );
`
const Zlote = styled.span`
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1;
`;

const Grosze = styled.span`
  font-size: 1rem;
  font-weight: bold;
  vertical-align: super;
  margin-left: 2px;
`;

const Zl = styled.span`
  font-size: 1rem;
  margin-left: 4px;
  align-self: flex-end;
`;

const PriceInfo = styled.div`

`

const PriceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2px;
`;

function formatPrice(price) {
  const parts = Number(price).toFixed(2).split(".");
  return {
    zlote: parts[0],
    grosze: parts[1],
  };
}


function Card({ machine,showRate  }) {
    const { zlote, grosze } = formatPrice(machine.price);

  return (
    <CardContainer>
      <CardImage src={machine.img} alt={machine.name} />
      <Title>{machine.name}</Title>
      <Description>Pojemność (kg): {machine.capacity}</Description>
      <Description>Wymiary (GxSxW): {machine.dimensions}</Description>
      <Description>Funkcje: {machine.functions.join(", ")}</Description>
      <EnClass>Klasa energetyczna: 
        <ClassDiv>
    {machine.efficiency}
        </ClassDiv>
    </EnClass>

<PriceInfo>
  
      <PriceContainer>
     <Zlote>{zlote}</Zlote>
          <Grosze>{grosze}</Grosze>
             <Zl>zł</Zl>
      </PriceContainer>
    {showRate && (
          <div style={{ marginTop: 8, color: "#666", fontSize: "1rem" }}>
            {machine.i_price}
          </div>
        )}
</PriceInfo>
    </CardContainer>
  );
}
export default Card;