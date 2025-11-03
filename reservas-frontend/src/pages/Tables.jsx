import React, { useEffect, useState } from "react";
import { createMesa, listMesas, deleteMesa, updateMesa } from "../services/apiMock";
import TableCard from "../components/TableCard";

export default function Tables() {
  const [mesas, setMesas] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [n_lugares, setNlugares] = useState("");
  const [msg, setMsg] = useState(null);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  const carregar = () => {
    const res = listMesas();
    if (!res.erro) setMesas(res.mesas);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!codigo || !n_lugares) {
      setMsg("Preencha todos os campos");
      return;
    }
    if (editing) {
      updateMesa({ id: editing.id, codigo, n_lugares, status: editing.status });
      setEditing(null);
      setMsg("Mesa atualizada");
    } else {
      createMesa({ codigo, n_lugares });
      setMsg("Mesa cadastrada");
    }
    setCodigo("");
    setNlugares("");
    carregar();
  };

  const handleEdit = (mesa) => {
    setEditing(mesa);
    setCodigo(mesa.codigo);
    setNlugares(mesa.n_lugares);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Deseja excluir essa mesa?")) return;
    deleteMesa(id);
    carregar();
  };

  const filtered = mesas.filter(m => m.codigo.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <h2>Mesas</h2>
      <div className="grid">
        <div>
          <h3>{editing ? "Editar Mesa" : "Cadastrar Mesa"}</h3>
          {msg && <div className="alert">{msg}</div>}
          <form onSubmit={handleCreate} className="form">
            <label>Código</label>
            <input value={codigo} onChange={e => setCodigo(e.target.value)} required />
            <label>Capacidade (n_lugares)</label>
            <input value={n_lugares} onChange={e => setNlugares(e.target.value)} required />
            <button className="btn" type="submit">{editing ? "Atualizar" : "Cadastrar"}</button>
            {editing && <button type="button" className="btn-outline" onClick={() => { setEditing(null); setCodigo(""); setNlugares(""); }}>Cancelar</button>}
          </form>
        </div>

        <div>
          <h3>Buscar Mesas</h3>
          <input placeholder="Pesquisar por código..." value={q} onChange={e => setQ(e.target.value)} />
          <div className="list">
            {filtered.length === 0 && <p>Nenhuma mesa encontrada.</p>}
            {filtered.map(m => (
              <TableCard key={m.id} mesa={m} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
