import { useState, useEffect } from "react";
import { washingMachines } from "../data/Machines";
import styled from "styled-components";
import Card from "./Card";
import Select, { components } from "react-select";

const FullWidthSection = styled.section`
  width: 100%;
  background: #fff;
  background: #f8f8f8;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
`;

const CardGrid = styled.div`
  margin-top: 8px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 360px));
  justify-content: center;

  @media (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Input = styled.input`
  min-width: 200px;
  padding: 2px 8px;
  margin: 0 auto;
  margin-top: 16px;
  font-size: 12px;
  border: none;
`;

const Filters = styled.div`
  width: 100%;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;

  @media (min-width: 739px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Filter = styled.div`
  font-size: 12px;
  padding: 4px 8px;
  margin: 0 auto;
  position: relative;
  @media (min-width: 739px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 8px 16px;
    margin: 0;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 350;
`;

const Results = styled.div`
  align-self: flex-start;
  font-size: 12px;
  padding-left: 14px;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  margin-bottom: 32px;
  margin-top: 8px;
  color: #007aff;
  padding: 0 18px;
  position: relative;
  cursor:pointer;

    `;

const ButtonArrow = styled.img`
position: absolute;
right:0;
top:40%;
  width: 10px;
  height: 8px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

`

const Sorter = styled.div`
background:none;
border:none;
cursor: pointer;
fontSize: 12px;
padding: 0;
position:absolute;
top:52%;
left:0%;
 `

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minWidth: 206,
    fontSize: 12,
    border: "none",
    boxShadow: "none",
    backgroundColor: "#fff",
    padding: "2px 2px",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f0f0f0" : "#fff", 
    color: "#222", 
    cursor: "pointer",
    fontSize: 12,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#222",
    fontSize: 12,
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0 8px",
  }),
};

const CustomDropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <img src="/arrow.png" alt="arrow" style={{ width: 14, height: 12 }} />
  </components.DropdownIndicator>
);

const uniqueEfficiencies = [...new Set(washingMachines.map(m => m.efficiency))];
const uniqueCapacities   = [...new Set(washingMachines.map(m => m.capacity))];
const allFunctions       = [...new Set(washingMachines.flatMap(m => m.functions))];

const sortOptions = [
  { value: "popular",  label: "Popularność" },
  { value: "price",    label: "Cena" },
  { value: "capacity", label: "Pojemność" }
];


const mapOptions = (arr, labelPrefix = "Pokaż wszystkie") =>
  [{ value: "", label: labelPrefix }, ...arr.map(v => ({ value: v, label: v }))];

export default function Content() {
  const [query, setQuery]= useState("");
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [fn, setFn] = useState({ value: "", label: "Pokaż wszystkie" });
  const [eff, setEff] = useState({ value: "", label: "Pokaż wszystkie" });
  const [cap, setCap] = useState({ value: "", label: "Pokaż wszystkie" });
  const [itemsToShow, setItemsToShow] = useState(6);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [visibleRatesCount, setVisibleRatesCount] = useState(3);

  useEffect(() => {
    setItemsToShow(6);
  }, [query, fn, eff, cap, sortBy]);

  let visibleMachines = washingMachines.filter(m => {
    if (query && !m.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (fn.value && !m.functions.includes(fn.value)) return false;
    if (eff.value && m.efficiency !== eff.value) return false;
    if (cap.value && m.capacity !== Number(cap.value)) return false;
    return true;
  });

  switch (sortBy.value) {
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

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 738) setVisibleRatesCount(1);
      else if (w < 1023) setVisibleRatesCount(2);
      else setVisibleRatesCount(3);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <FullWidthSection>
      <Wrapper>
        <Input
          type="text"
          placeholder="Szukaj…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <Filters className="filters">
          <Filter>
            <Label htmlFor="sort-select"><b>Sortuj po:</b></Label>
            <br />
            <span>
              <Select
                id="sort-select"
                value={sortBy}
                onChange={option => {
                  setSortBy(option);
                  setSortOrder("asc");
                }}
                options={sortOptions}
                styles={customSelectStyles}
                isSearchable={false}
                components={{ DropdownIndicator: CustomDropdownIndicator }}
              />
              {sortBy.value !== "popular" && (
                <Sorter
                  type="button"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  aria-label={`Zmień kierunek sortowania na ${sortOrder === "asc" ? "malejąco" : "rosnąco"}`}
                  title={`Zmień kierunek sortowania na ${sortOrder === "asc" ? "malejąco" : "rosnąco"}`}
                >
                  {sortIcon}
                </Sorter>
              )}
            </span>
          </Filter>

          <Filter>
            <Label htmlFor="fn-select"><b>Funkcje:</b></Label><br />
            <Select
              id="fn-select"
              value={fn}
              onChange={setFn}
              options={mapOptions(allFunctions)}
              styles={customSelectStyles}
              isSearchable={false}
              components={{ DropdownIndicator: CustomDropdownIndicator }}
            />
          </Filter>

          <Filter>
            <Label htmlFor="eff-select"><b>Klasa energetyczna:</b></Label><br />
            <Select
              id="eff-select"
              value={eff}
              onChange={setEff}
              options={mapOptions(uniqueEfficiencies)}
              styles={customSelectStyles}
              isSearchable={false}
              components={{ DropdownIndicator: CustomDropdownIndicator }}
            />
          </Filter>

          <Filter>
            <Label htmlFor="cap-select"><b>Pojemność:</b></Label><br />
            <Select
              id="cap-select"
              value={cap}
              onChange={setCap}
              options={mapOptions(uniqueCapacities)}
              styles={customSelectStyles}
              isSearchable={false}
              components={{ DropdownIndicator: CustomDropdownIndicator }}
            />
          </Filter>
        </Filters>

        <Results>
          Liczba wyników: {visibleMachines.length}
        </Results>

        <CardGrid>
          {displayedMachines.length
            ? displayedMachines.map((m, idx) => (
                <Card
                  key={m.id}
                  machine={m}
                  showRate={idx < visibleRatesCount}
                  isSelected={selectedCardId === m.id}
                  onSelect={() => setSelectedCardId(m.id)}
                />
              ))
            : <p>Brak wyników</p>
          }
        </CardGrid>

        {itemsToShow < visibleMachines.length && (

<ButtonContainer>
  <Button onClick={() => setItemsToShow(itemsToShow + 6)}>
    Pokaż więcej
    <ButtonArrow src="/Poly.svg" alt="" />
  </Button>
</ButtonContainer>

        )}
      </Wrapper>
    </FullWidthSection>
  );
}