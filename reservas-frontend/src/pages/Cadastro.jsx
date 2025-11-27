import React, { useState } from "react";

function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>

      <div className="card form-card">
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <input
            name="sobrenome"
            placeholder="Sobrenome"
            value={form.sobrenome}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="rua"
            placeholder="Rua"
            value={form.rua}
            onChange={handleChange}
            required
          />

          <input
            name="numero"
            placeholder="Número"
            value={form.numero}
            onChange={handleChange}
            required
          />

          <input
            name="bairro"
            placeholder="Bairro"
            value={form.bairro}
            onChange={handleChange}
            required
          />

          <input
            name="cidade"
            placeholder="Cidade"
            value={form.cidade}
            onChange={handleChange}
            required
          />

          <input
            name="uf"
            placeholder="UF"
            value={form.uf}
            onChange={handleChange}
            maxLength="2"
            required
          />

          <button className="btn" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
