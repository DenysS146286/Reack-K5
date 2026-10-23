import { useState } from "react";
import Naglowek from "./components/Naglowek";
import UczestnikCard from "./components/UczestnikCard";
import uczestnicy from "./data";
import "./App.css";
 
function App() {
  const [wybranyId, setWybranyId] = useState(null);
 
  const handleSelect = (id) => setWybranyId(wybranyId === id ? null : id);
 
  return (
    <div className="app">
      <Naglowek tytul="Katalog uczestników kursu React" />
      <div className="lista">
        {uczestnicy.map((u) => (
          <UczestnikCard
            key={u.id}
            uczestnik={u}
            rozwiniety={wybranyId === u.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
export default App;