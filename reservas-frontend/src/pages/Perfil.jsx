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

return ( <div className="card"> <h2>Meu Perfil</h2>

```
  <p><strong>Nome:</strong> {usuario.nome}</p>
  <p><strong>Email:</strong> {usuario.email}</p>
  <p><strong>Função:</strong> {usuario.role}</p>

  {usuario.extra && (
    <div style={{ marginTop: "20px" }}>
      <h3>Dados adicionais</h3>
      <p><strong>Rua:</strong> {usuario.extra.rua}</p>
      <p><strong>Número:</strong> {usuario.extra.numero}</p>
      <p><strong>Bairro:</strong> {usuario.extra.bairro}</p>
      <p><strong>Cidade:</strong> {usuario.extra.cidade}</p>
      <p><strong>UF:</strong> {usuario.extra.uf}</p>
    </div>
  )}

  <Link to="/perfil/editar" className="btn" style={{ marginTop: "20px" }}>
    Editar Perfil
  </Link>
</div>
);
}
