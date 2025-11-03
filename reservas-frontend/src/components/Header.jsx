import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authLogout, getAuthUser } from "../services/apiMock";

function Header() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("rm_auth_token_v1") || "null");
  const user = auth ? JSON.parse(localStorage.getItem("rm_users_v1") || "[]").find(u => u.id === auth.userId) : null;

  const handleLogout = () => {
    authLogout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="brand">Reservas de Mesas</div>
      <nav>
        <Link to="/">Home</Link>
        {auth && <Link to="/mesas">Mesas</Link>}
        {auth && <Link to="/minhas-reservas">Minhas Reservas</Link>}
        {auth && <Link to="/perfil">Perfil</Link>}
        {!auth && <Link to="/login">Login</Link>}
        {!auth && <Link to="/cadastro">Cadastro</Link>}
        {auth && (
          <button className="btn-link" onClick={handleLogout}>
            Sair
          </button>
        )}
      </nav>
      <div className="userInfo">
        {user ? <small>{user.nome} ({user.role})</small> : null}
      </div>
    </header>
  );
}

export default Header;
