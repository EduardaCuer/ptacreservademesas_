import React from "react";

function Cardapio() {
  const comidas = [
    { id: 1, nome: "Hambúrguer Artesanal", descricao: "Pão brioche, carne 180g, queijo e maionese da casa." },
    { id: 2, nome: "Macarrão Alfredo", descricao: "Massa ao molho cremoso com parmesão fresco." },
    { id: 3, nome: "Pizza Margherita", descricao: "Molho de tomate, mussarela, manjericão fresco." }
  ];

  return (
    <div className="container">
      <h2>Cardápio</h2>

      <div className="list">
        {comidas.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.nome}</h3>
            <p>{item.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cardapio;
