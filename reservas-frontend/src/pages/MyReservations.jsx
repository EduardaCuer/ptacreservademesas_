import React, { useEffect, useState } from "react";
import { listMyReservas } from "../services/apiMock";

export default function MyReservations() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const res = listMyReservas();
    if (!res.erro) setReservas(res.reservas);
  }, []);

  return (
    <div>
      <h2>Minhas Reservas</h2>
      {reservas.length === 0 && <p>Você não possui reservas.</p>}
      <div className="list">
        {reservas.map(r => (
          <div key={r.id} className="card">
            <h3>Reserva #{r.id}</h3>
            <p><strong>Data:</strong> {r.data}</p>
            <p><strong>Pessoas:</strong> {r.n_pessoas}</p>
            <p><strong>Mesa:</strong> {r.mesa ? r.mesa.codigo : "—"}</p>
            <p><small>Criado: {new Date(r.createdAt).toLocaleString()}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
}
