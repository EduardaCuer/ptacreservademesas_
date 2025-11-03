import React, { useEffect } from "react";
import { seedInitial } from "../services/apiMock";

export default function Home() {
  useEffect(() => {
    seedInitial(); // cria usuários e mesas iniciais (admin + cliente) se estiver vazio
  }, []);

  return (
    <div>
      <h1 className="home">Bem-vindo ao sistema de Reservas</h1>
    </div>
  );
}
