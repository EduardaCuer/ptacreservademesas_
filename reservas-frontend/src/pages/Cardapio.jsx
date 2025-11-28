import React from "react";

function Cardapio() {
  const comidas = [
    { id: 1, nome: "Hambúrguer Artesanal", fotoClass: "foto-hamburguer", descricao: "Pão brioche, carne 180g, queijo e maionese da casa." },
    { id: 2, nome: "Macarrão Alfredo", fotoClass: "foto-alfredo", descricao: "Massa ao molho cremoso com parmesão fresco." },
    { id: 3, nome: "Pizza Margherita", fotoClass: "foto-pizza", descricao: "Molho de tomate, mussarela, manjericão fresco." }
  ];

  return (
    <div className="cardapio-container">
      <h2>Cardápio</h2>

      <div className="cardapio-list">
        {comidas.map((item) => (
          <div key={item.id} className="item-card">
            <div className={`item-photo ${item.fotoClass}`}></div>

            <div className="item-info">
              <h3>{item.nome}</h3>
              <p>{item.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cardapio;
