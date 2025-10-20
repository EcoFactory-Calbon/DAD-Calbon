import React from "react";

function RemoverFuncionario({ funcionario, onConfirmar, onCancelar }) {
  if (!funcionario) return null;

  return (
    <div className="popup-remover">
      <div className="popup-conteudo">
        <h2>Remover Funcionário</h2>
        <p>
          Deseja realmente remover{" "}
          <strong>
            {funcionario.nome} {funcionario.sobrenome}
          </strong>
          ?
        </p>

        <div className="botoes-remover">
          <button
            className="btn-confirmar"
            onClick={() => onConfirmar(funcionario.numeroCracha)}
          >
            Sim, remover
          </button>
          <button className="btn-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoverFuncionario;
