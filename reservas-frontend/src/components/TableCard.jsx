import React from "react";
import { Link } from "react-router-dom";

export default function TableCard({ mesa, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-left">
        <h3>{mesa.codigo}</h3>
        <p>{mesa.n_lugares} lugares</p>
      </div>
      <div className="card-right">
        <span className={"badge " + (mesa.status === "ocupada" ? "badge-red" : "badge-green")}>
          {mesa.status}
        </span>
        <div className="actions">
          <Link to={`/reservar/${mesa.id}`} className="btn">Reservar</Link>
          {onEdit && <button className="btn-outline" onClick={() => onEdit(mesa)}>Editar</button>}
          {onDelete && <button className="btn-danger" onClick={() => onDelete(mesa.id)}>Excluir</button>}
        </div>
      </div>
    </div>
  );
}
