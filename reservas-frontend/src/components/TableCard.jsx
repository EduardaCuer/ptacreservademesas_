import React from "react";
import { Link } from "react-router-dom";

export default function TableCard({ mesa, onEdit, onDelete, isAdmin }) {
  return (
    <div className="card">
      <div className="card-left">
        <h3>{mesa.codigo}</h3>
        <p>{mesa.n_lugares} lugares</p>
        {isAdmin && mesa.reservas?.length > 0 && (
          <div>
            <strong>Reservas:</strong>
            <ul>
              {mesa.reservas.map(r => (
                <li key={r.id}>{r.clienteNome} - {r.data}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="card-right">
        <span className={"badge " + (mesa.status === "ocupada" ? "badge-red" : "badge-green")}>
          {mesa.status}
        </span>
        <div className="actions">
          {/* Clientes só podem reservar mesas disponíveis */}
          {!isAdmin && mesa.status === "disponivel" && (
            <Link to={`/reservar/${mesa.id}`} className="btn">Reservar</Link>
          )}
          {/* Admin só pode editar/excluir */}
          {isAdmin && <button className="btn-outline" onClick={() => onEdit(mesa)}>Editar</button>}
          {isAdmin && <button className="btn-danger" onClick={() => onDelete(mesa.id)}>Excluir</button>}
        </div>
      </div>
    </div>
  );
}
