import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../services/apiMock";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    const res = authLogin({ email, password });
    setMsg(res.mensagem);
    if (!res.erro) {
      navigate("/mesas");
    }
  };

  return (
    <div className="card form-card">
      <h2>Login</h2>
      {msg && <div className="alert">{msg}</div>}
      <form onSubmit={handle}>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Senha</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </div>
  );
}
