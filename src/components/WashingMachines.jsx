import Content from "./Content"
import styled from "styled-components";

const Heading = styled.h2`
    text-align: center;
    font-size: 32px;
    margin-top: 16px;
    margin-bottom: 16px;
    line-height:32px;
`;



function WashingMachines() {
  return (
      <>
    <Heading>
      Wybierz urządzenie
    </Heading>
    <Content/>
    </>
  );
}
export default WashingMachines;