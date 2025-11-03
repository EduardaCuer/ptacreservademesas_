import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRegister } from "../services/apiMock";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    const res = authRegister({ nome, email, password, role });
    setMsg(res.mensagem);
    if (!res.erro) navigate("/mesas");
  };

  return (
    <div className="card form-card">
      <h2>Cadastro</h2>
      {msg && <div className="alert">{msg}</div>}
      <form onSubmit={handle}>
        <label>Nome</label>
        <input value={nome} onChange={e => setNome(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} required type="email" />
        <label>Senha</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        <label>Função</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="cliente">Cliente</option>
          <option value="adm">Administrador (apenas para testes)</option>
        </select>
        <button className="btn" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
