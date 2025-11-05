import React, { useEffect, useState } from "react";
import { listMesas, createMesa, updateMesa, deleteMesa } from "../services/apiMock";

export default function Mesas() {
  const [mesas, setMesas] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [n_lugares, setNlugares] = useState("");
  const [msg, setMsg] = useState(null);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    carregarMesas();
  }, []);

  const carregarMesas = () => {
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
    carregarMesas();
  };

  const handleEdit = (mesa) => {
    setEditing(mesa);
    setCodigo(mesa.codigo);
    setNlugares(mesa.n_lugares);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Deseja excluir esta mesa?")) return;
    deleteMesa(id);
    carregarMesas();
  };

  const filtered = mesas.filter(m => m.codigo.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <h2>Mesas</h2>

      {/* Formulário de cadastro para todos */}
      <div className="card">
        <h3>{editing ? "Editar Mesa" : "Cadastrar Mesa"}</h3>
        {msg && <div className="alert">{msg}</div>}
        <form onSubmit={handleCreate}>
          <label>Código</label>
          <input value={codigo} onChange={e => setCodigo(e.target.value)} required />
          <label>Capacidade</label>
          <input value={n_lugares} onChange={e => setNlugares(e.target.value)} required />
          <button className="btn" type="submit">{editing ? "Atualizar" : "Cadastrar"}</button>
          {editing && <button type="button" className="btn-outline" onClick={() => { setEditing(null); setCodigo(""); setNlugares(""); }}>Cancelar</button>}
        </form>
      </div>

      {/* Lista de mesas */}
      <div className="list">
        <input placeholder="Pesquisar por código..." value={q} onChange={e => setQ(e.target.value)} />
        {filtered.length === 0 && <p>Nenhuma mesa encontrada.</p>}

        {filtered.map(m => (
          <div key={m.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <strong>{m.codigo}</strong> - {m.n_lugares} lugares
            <span style={{ marginLeft: '10px', fontWeight: 'bold', color: m.status === 'ocupada' ? 'red' : 'green' }}>
              {m.status}
            </span>

            {/* Botões de editar/excluir */}
            <div style={{ marginTop: '5px' }}>
              <button onClick={() => handleEdit(m)}>Editar</button>
              <button onClick={() => handleDelete(m.id)}>Excluir</button>
            </div>

            {/* Botão reservar mesas disponíveis */}
            {m.status === "disponivel" && (
              <a href={`/reservar/${m.id}`} className="btn">Reservar</a>
            )}

            {/* Mostrar reservas */}
            {m.reservas?.length > 0 && (
              <div>
                <strong>Reservas:</strong>
                <ul>
                  {m.reservas.map(r => (
                    <li key={r.id}>{r.clienteNome} - {r.data}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
