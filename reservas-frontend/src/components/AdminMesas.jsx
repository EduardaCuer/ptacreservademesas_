import React, { useState, useEffect } from "react";
import { listMesas, createMesa, deleteMesa } from "../services/apiMock";
import TableCard from "./TableCard";

export default function AdminMesas({ userRole }) {
  const [mesas, setMesas] = useState([]);
  const [form, setForm] = useState({ codigo: "", n_lugares: 1 });

  useEffect(() => {
    carregarMesas();
  }, []);

  const carregarMesas = () => {
    const res = listMesas();
    if (!res.erro) setMesas(res.mesas);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.codigo || !form.n_lugares) return;
    const res = createMesa(form);
    if (!res.erro) {
      setForm({ codigo: "", n_lugares: 1 });
      carregarMesas();
    } else alert(res.mensagem);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja excluir esta mesa?")) {
      const res = deleteMesa(id);
      if (!res.erro) carregarMesas();
      else alert(res.mensagem);
    }
  };

  return (
    <div>
      <h2>Gerenciar Mesas (Admin)</h2>

      <form onSubmit={handleCreate} className="form-card">
        <label>Código da Mesa</label>
        <input
          type="text"
          value={form.codigo}
          onChange={(e) => setForm({ ...form, codigo: e.target.value })}
          required
        />
        <label>Número de Lugares</label>
        <input
          type="number"
          value={form.n_lugares}
          onChange={(e) => setForm({ ...form, n_lugares: e.target.value })}
          min={1}
          required
        />
        <button className="btn" type="submit">
          Cadastrar Mesa
        </button>
      </form>

      <div className="list">
        {mesas.map((mesa) => (
          <TableCard
            key={mesa.id}
            mesa={mesa}
            onDelete={handleDelete}
            onEdit={() => {}}
            userRole={userRole}
          />
        ))}
      </div>
    </div>
  );
}
