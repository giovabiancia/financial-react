import React, { useState } from "react";

export default function StockHook() {
  // il primo è il valore iniziale e il secondo la variabile da richiamare quando voglio fare cambiamneti
  const [prezzo, setprezzo] = useState(120);
  const [ora, setOra] = useState("12:30");
  return <div></div>;
}
