import React, { useEffect, useState } from "react";
import { getAuthUser, updateProfile } from "../services/apiMock";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const res = getAuthUser();
    if (!res.erro) {
      setNome(res.usuario.nome);
      setEmail(res.usuario.email);
    }
  }, []);

  const handle = async (e) => {
    e.preventDefault();
    const res = updateProfile({ nome, email });
    setMsg(res.mensagem);
    if (!res.erro) navigate("/perfil");
  };

  return (
    <div className="card form-card">
      <h2>Editar Perfil</h2>
      {msg && <div className="alert">{msg}</div>}
      <form onSubmit={handle}>
        <label>Nome</label>
        <input value={nome} onChange={e => setNome(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} required type="email" />
        <button className="btn" type="submit">Salvar</button>
      </form>
    </div>
  );
}
