import React, { useEffect } from "react";
import { seedInitial } from "../services/apiMock";

export default function Home() {
  useEffect(() => {
    seedInitial(); 
  }, []);

  return (
    <div>
      <h1 className="home">RESTAURANTE  RAÍZES  NOBRES</h1>
    </div>
  );
}
