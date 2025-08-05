import { useState, useEffect } from "react";
import { washingMachines } from "../data/washingMachines";
import styled from "styled-components";
import Card from "./Card";


const FullWidthSection = styled.section`
  width: 100%;
  background: #fff;

`;

const Container = styled.div`
  max-width: 1200px;   
  margin: 0 auto;
  padding: 0 24px;     
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  max-width: 256px;
  min-height: 36px;
  padding: 4px 8px;   
`;

const Filters = styled.div`
width: 100%;
display: flex;
justify-content: center;
`

const Filter = styled.div`
  max-width: 256px;
  min-height: 36px;   
  padding: 8px 16px;
`
const Results = styled.div`
  align-self: flex-start; 
`

const Button = styled.button`
border:none;
background-color:inherit;
margin-bottom: 32px;
margin-top: 8px;
color: #007aff;

`




const uniqueEfficiencies = [...new Set(washingMachines.map(m => m.efficiency))];
const uniqueCapacities   = [...new Set(washingMachines.map(m => m.capacity))];
const allFunctions       = [...new Set(washingMachines.flatMap(m => m.functions))];

const sortOptions = [
  { value: "popular",  label: "Popularność" },
  { value: "price",    label: "Cena" },
  { value: "capacity", label: "Pojemność" }
];

export default function Content() {
  const [query, setQuery]      = useState("");
  const [sortBy, setSortBy]    = useState("popular");
  const [sortOrder, setSortOrder] = useState("asc");
  const [fn, setFn]            = useState("");
  const [eff, setEff]          = useState("");
  const [cap, setCap]          = useState("");
  const [itemsToShow, setItemsToShow] = useState(6);


  useEffect(() => {
    setItemsToShow(6);
  }, [query, fn, eff, cap, sortBy]);


  let visibleMachines = washingMachines.filter(m => {
    if (query && !m.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (fn  && !m.functions.includes(fn)) return false;
    if (eff && m.efficiency !== eff) return false;
    if (cap && m.capacity !== Number(cap)) return false;
    return true;
  });


  switch (sortBy) {
    case "price":
      visibleMachines.sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
      break;
    case "capacity":
      visibleMachines.sort((a, b) =>
        sortOrder === "asc" ? a.capacity - b.capacity : b.capacity - a.capacity
      );
      break;
    default:
      break;
  }


  const displayedMachines = visibleMachines.slice(0, itemsToShow);
  const sortIcon = sortOrder === "asc" ? "▲" : "▼";

    const [visibleRatesCount, setVisibleRatesCount] = useState(3);

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 600) setVisibleRatesCount(1);     
      else if (w < 900) setVisibleRatesCount(2); 
      else setVisibleRatesCount(3);              
    }
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Wrapper>

      <Input
        type="text"
        placeholder="Szukaj po nazwie…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Filters className="filters" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>

        <Filter>
          <label htmlFor="sort-select"><b>Sortuj po:</b></label>
          <br />
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <select
              id="sort-select"
              value={sortBy}
              onChange={e => {
                setSortBy(e.target.value);
                setSortOrder("asc"); 
              }}
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {sortBy !== "popular" && (
              <button
                type="button"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.1em",
                  padding: 0
                }}
                aria-label={`Zmień kierunek sortowania na ${sortOrder === "asc" ? "malejąco" : "rosnąco"}`}
                title={`Zmień kierunek sortowania na ${sortOrder === "asc" ? "malejąco" : "rosnąco"}`}
              >
                {sortIcon}
              </button>
            )}
          </span>
        </Filter>

        <Filter>
          <label htmlFor="fn-select"><b>Funkcje:</b></label><br />
          <select
            id="fn-select"
            value={fn}
            onChange={e => setFn(e.target.value)}
          >
            <option value="">Pokaż wszystkie</option>
            {allFunctions.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </Filter>

        <Filter>
          <label htmlFor="eff-select"><b>Klasa energetyczna:</b></label><br />
          <select
            id="eff-select"
            value={eff}
            onChange={e => setEff(e.target.value)}
          >
            <option value="">Pokaż wszystkie</option>
            {uniqueEfficiencies.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </Filter>

        <Filter>
          <label htmlFor="cap-select"><b>Pojemność:</b></label><br />
          <select
            id="cap-select"
            value={cap}
            onChange={e => setCap(e.target.value)}
          >
            <option value="">Pokaż wszystkie</option>
            {uniqueCapacities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Filter>
      </Filters>


      <Results>
        Liczba wyników: {visibleMachines.length}
      </Results>

  <div className="card-list" style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 16 }}>
  {displayedMachines.length
    ? displayedMachines.map((m, idx) => (
        <Card key={m.id} machine={m} showRate={idx < visibleRatesCount} />
      ))
    : <p>Brak wyników</p>
  }
</div>

      {itemsToShow < visibleMachines.length && (
          <Button
            onClick={() => setItemsToShow(itemsToShow + 6)}
  
          >
            Pokaż więcej
          </Button>
      )}
    </Wrapper>
  );
}