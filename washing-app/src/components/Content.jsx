import { useState, useEffect } from "react";
import { washingMachines } from "../data/washingMachines";
import Card from "./Card";

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

  return (
    <div>

      <input
        type="text"
        placeholder="Szukaj po nazwie…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <div className="filters" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>
      </div>


      <div style={{ margin: "16px 0", fontWeight: "bold" }}>
        Liczba wyników: {visibleMachines.length}
      </div>

      <div className="card-list" style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 16 }}>
        {displayedMachines.length
          ? displayedMachines.map(m => (
              <Card key={m.id} machine={m} />
            ))
          : <p>Brak wyników</p>
        }
      </div>

      {itemsToShow < visibleMachines.length && (
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <button
            onClick={() => setItemsToShow(itemsToShow + 6)}
            style={{
              padding: "8px 16px",
            }}
          >
            Pokaż więcej
          </button>
        </div>
      )}
    </div>
  );
}