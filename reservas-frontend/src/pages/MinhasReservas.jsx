import React, { useEffect, useState } from "react";
import { listMyReservas, deleteReserva, updateReserva } from "../services/apiMock";

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({ data: "", n_pessoas: "" });

  useEffect(() => {
    carregarReservas();
  }, []);

  const carregarReservas = () => {
    const res = listMyReservas();
    if (!res.erro) setReservas(res.reservas);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja excluir esta reserva?")) {
      const res = deleteReserva(id);
      if (!res.erro) {
        alert("Reserva excluída com sucesso!");
        carregarReservas();
      } else {
        alert(res.mensagem);
      }
    }
  };

  const iniciarEdicao = (r) => {
    setEditandoId(r.id);
    setForm({
      data: r.data,
      n_pessoas: r.n_pessoas,
    });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setForm({ data: "", n_pessoas: "" });
  };

  const salvarEdicao = (id) => {
    if (!form.data || !form.n_pessoas) {
      alert("Preencha todos os campos!");
      return;
    }

    const res = updateReserva(id, form);
    if (!res.erro) {
      alert("Reserva atualizada com sucesso!");
      cancelarEdicao();
      carregarReservas();
    } else {
      alert(res.mensagem);
    }
  };

  return (
    <div>
      <h2>Minhas Reservas</h2>

      {reservas.length === 0 && <p>Você não possui reservas.</p>}

      <div className="list">
        {reservas.map((r) => (
          <div key={r.id} className="card">
            {editandoId === r.id ? (
              <>
                <h3>Editar Reserva #{r.id}</h3>
                <div className="form">
                  <label>Data:</label>
                  <input
                    type="date"
                    value={form.data}
                    onChange={(e) => setForm({ ...form, data: e.target.value })}
                  />

                  <label>Número de Pessoas:</label>
                  <input
                    type="number"
                    value={form.n_pessoas}
                    onChange={(e) =>
                      setForm({ ...form, n_pessoas: e.target.value })
                    }
                  />

                  <p>
                    <strong>Mesa:</strong>{" "}
                    {r.mesa ? r.mesa.codigo : "—"}
                  </p>

                  <div style={{ marginTop: "12px" }}>
                    <button className="btn" onClick={() => salvarEdicao(r.id)}>
                      Salvar
                    </button>
                    <button className="btn-outline" onClick={cancelarEdicao}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3>Reserva #{r.id}</h3>
                <p>
                  <strong>Data:</strong> {r.data}
                </p>
                <p>
                  <strong>Pessoas:</strong> {r.n_pessoas}
                </p>
                <p>
                  <strong>Mesa:</strong>{" "}
                  {r.mesa ? r.mesa.codigo : "—"}
                </p>
                <p>
                  <small>
                    Criado em: {new Date(r.createdAt).toLocaleString()}
                  </small>
                </p>
                <div>
                  <button
                    className="btn-outline"
                    onClick={() => iniciarEdicao(r)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(r.id)}
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
