import React, { useEffect, useState } from "react";
import { getAuthUser } from "../services/apiMock";
import { Link } from "react-router-dom";

export default function Profile() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const res = getAuthUser();
    if (!res.erro) setUsuario(res.usuario);
  }, []);

  if (!usuario) return <div>Carregando...</div>;

  return (
    <div className="card">
      <h2>Meu Perfil</h2>
      <p><strong>Nome:</strong> {usuario.nome}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Função:</strong> {usuario.role}</p>
      <Link to="/perfil/editar" className="btn">Editar Perfil</Link>
    </div>
  );
}
