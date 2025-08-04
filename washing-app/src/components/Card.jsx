
function Card({ machine }) {
  return (
    <div className="card">
      <h3>{machine.name}</h3>
      <p>Klasa: {machine.efficiency}</p>
      <p>Pojemność: {machine.capacity} kg</p>
      <p>Funkcje: {machine.functions.join(", ")}</p>
      <p>Cena: {machine.price} zł</p>
    </div>
  );
}
export default Card;