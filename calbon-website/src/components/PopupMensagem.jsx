import React from "react";
import "../styles/popupMensagem.css";

function PopupMensagem({ tipo = "info", mensagem, onFechar }) {
  return (
    <div className="popup-overlay">
      <div className={`popup-mensagem ${tipo}`}>
        <p>{mensagem}</p>
        <button onClick={onFechar}>OK</button>
      </div>
    </div>
  );
}

export default PopupMensagem;
