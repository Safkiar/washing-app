import Content from "./Content"
import styled from "styled-components";

const Heading = styled.h2`
    text-align: center;
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