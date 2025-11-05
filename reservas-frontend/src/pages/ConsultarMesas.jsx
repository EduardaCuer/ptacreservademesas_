import React, { useState, useEffect } from "react";
import { listMesas } from "../services/apiMock";

export default function ConsultarMesas() {
  const [mesas, setMesas] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroCapacidade, setFiltroCapacidade] = useState("");

  useEffect(() => {
    carregarMesas();
  }, []);

  const carregarMesas = () => {
    const res = listMesas();
    if (!res.erro) setMesas(res.mesas);
  };

  // 🔹 Botão Consultar: aplica filtros
  const handleConsultar = () => {
    const res = listMesas();
    if (!res.erro) {
      let filtradas = res.mesas;

      if (filtroStatus)
        filtradas = filtradas.filter((m) =>
          m.status.toLowerCase().includes(filtroStatus.toLowerCase())
        );

      if (filtroCapacidade)
        filtradas = filtradas.filter(
          (m) => String(m.n_lugares) === filtroCapacidade
        );

      setMesas(filtradas);
    }
  };

  // 🔹 Botão Limpar: limpa filtros e recarrega tudo
  const handleLimpar = () => {
    setFiltroStatus("");
    setFiltroCapacidade("");
    carregarMesas();
  };

  return (
    <div>
      <h2>Consultar Mesas</h2>

      <div className="form">
        <label>Status:</label>
        <input
          type="text"
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          placeholder="Ex: disponivel, ocupada..."
        />

        <label>Capacidade:</label>
        <input
          type="number"
          value={filtroCapacidade}
          onChange={(e) => setFiltroCapacidade(e.target.value)}
          placeholder="Ex: 4"
        />

        <div style={{ marginTop: "12px" }}>
          <button className="btn" onClick={handleConsultar}>
            Consultar
          </button>
          <button className="btn-outline" onClick={handleLimpar}>
            Limpar
          </button>
        </div>
      </div>

      <div className="list" style={{ marginTop: "20px" }}>
        {mesas.length === 0 ? (
          <p>Nenhuma mesa encontrada.</p>
        ) : (
          mesas.map((m) => (
            <div key={m.id} className="card">
              <h3>Mesa {m.codigo}</h3>
              <p>
                <strong>Status:</strong> {m.status}
              </p>
              <p>
                <strong>Capacidade:</strong> {m.n_lugares} lugares
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
