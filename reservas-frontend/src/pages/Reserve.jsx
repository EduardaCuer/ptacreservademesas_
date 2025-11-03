import React, { useEffect, useState } from "react";
import { createReserva, listMesas } from "../services/apiMock";
import { useNavigate, useParams } from "react-router-dom";

export default function Reserve() {
  const [data, setData] = useState("");
  const [n_pessoas, setNpessoas] = useState(1);
  const [mesaId, setMesaId] = useState("");
  const [mesas, setMesas] = useState([]);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const res = listMesas();
    if (!res.erro) setMesas(res.mesas.filter(m => m.status === "disponivel"));
    if (params.mesaId) setMesaId(params.mesaId);
  }, [params]);

  const handle = (e) => {
    e.preventDefault();
    if (!data || !mesaId) {
      setMsg("Preencha data e selecione uma mesa");
      return;
    }
    const res = createReserva({ data, n_pessoas, mesaId });
    setMsg(res.mensagem);
    if (!res.erro) navigate("/minhas-reservas");
  };

  return (
    <div className="card form-card">
      <h2>Reservar Mesa</h2>
      {msg && <div className="alert">{msg}</div>}
      <form onSubmit={handle}>
        <label>Data</label>
        <input type="date" value={data} onChange={e => setData(e.target.value)} required />
        <label>Número de Pessoas</label>
        <input type="number" min="1" value={n_pessoas} onChange={e => setNpessoas(e.target.value)} />
        <label>Selecionar Mesa</label>
        <select value={mesaId} onChange={e => setMesaId(e.target.value)} required>
          <option value="">-- escolha --</option>
          {mesas.map(m => <option key={m.id} value={m.id}>{m.codigo} - {m.n_lugares} lugares</option>)}
        </select>
        <button className="btn" type="submit">Confirmar Reserva</button>
      </form>
    </div>
  );
}
