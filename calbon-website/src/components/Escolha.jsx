import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/escolha.css"; // opcional

function Escolha() {
  const navigate = useNavigate();

  return (
    <div className="pagina-escolha">
      <h1>Bem-vindo(a)!</h1>
      <p>Escolha para onde deseja ir:</p>
      <div className="botoes-escolha">
        <button onClick={() => navigate("/visualizar")}>Gerenciamento</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/chatbot")}>Chat Bot</button>
      </div>
    </div>
  );
}

export default Escolha;
