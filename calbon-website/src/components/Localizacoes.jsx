// src/components/Localizacoes.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LocalizacaoService from "../services/localizacaoService";
import "../styles/localizacao.css";

import iconeHome from "../assets/img/icone-home.png";
import iconeLocalizacao from "../assets/img/icone-localizacao.png";
import iconeSair from "../assets/img/icone-sair.png";
import iconeLogo from "../assets/img/logo-escrita.png";

function Localizacoes() {
  const [localizacoes, setLocalizacoes] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);

  // Carrega as localizações da API
  useEffect(() => {
    const fetchLocalizacoes = async () => {
      try {
        const response = await LocalizacaoService.listar();
        setLocalizacoes(response.data);
      } catch (err) {
        console.error("Erro ao buscar localizações:", err);
      }
    };
    fetchLocalizacoes();
  }, []);

  return (
    <div className="pagina-localizacoes">
      <header>
        <button onClick={() => navigate("/escolha")} class="logo-btn">
          <img src={iconeLogo} alt="Logo da empresa" className="logo-img" />
        </button>
      </header>

      <aside className="sidebar">
        <ul>
          <li className="sidebar-item" onClick={() => navigate("/visualizar")}>
            <img src={iconeHome} alt="Home" className="icon-img" />
            <span className="label">Home</span>
          </li>
          <li className="sidebar-item" onClick={() => navigate("/localizacao")}>
            <img src={iconeLocalizacao} alt="Localizações" className="icon-img" />
            <span className="label">Localizações</span>
          </li>
        </ul>

        <button id="back-btn" onClick={() => navigate("/escolha")}>
          <img src={iconeSair} alt="Voltar" className="icon-img" />
          <span className="label">Voltar</span>
        </button>
      </aside>


      <main>
        <div className="title-container-localizacao">
          <div className="title-row">
            <img src={iconeLocalizacao} alt="Ícone Localização" className="title-icon" />
            <span className="separator">|</span>
            <h1 className="titulo">Localizações</h1>
          </div>
          <p className="subtitulo">
            Aqui você pode visualizar a tabela de localizações da empresa, mostrando o ID, Estado e Cidade de cada registro, informações que serão necessárias para cadastrar ou referenciar outros dados.
          </p>
        </div>

        <div className="tabela-container">
          {localizacoes.length > 0 ? (
            <table className="tabela-localizacoes">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Estado</th>
                  <th>Cidade</th>
                </tr>
              </thead>
              <tbody>
                {localizacoes.map((loc) => (
                  <tr key={loc.id}>
                    <td>{loc.id}</td>
                    <td>{loc.estado}</td>
                    <td>{loc.cidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>Nenhuma localização encontrada.</p>
          )}
        </div>
      </main>

      {/* Aqui você pode adicionar pop-up para inserir localização se quiser */}
      {mostrarPopup && (
        <div className="popup">
          {/* Conteúdo do pop-up */}
          <span className="fechar" onClick={() => setMostrarPopup(false)}>×</span>
          <h2>Inserir Localização</h2>
        </div>
      )}
    </div>
  );
}

export default Localizacoes;
