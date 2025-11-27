import React, { useEffect } from "react";
import { seedInitial } from "../services/apiMock";

export default function Home() {
  useEffect(() => {
    seedInitial(); 
  }, []);

  return (
    <div>
      <h1 className="home">Bem-vindo ao sistema de Reservas de MesasS</h1>
    </div>
  );
}
