// src/components/Localizacoes.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LocalizacaoService from "../services/localizacaoService";
import "../styles/localizacao.css";

import iconeTabela from "../assets/img/icone-tabela.png";
import iconeLocalizacao from "../assets/img/icone-localizacao.png";
import iconeLupa from "../assets/img/icone-lupa.png";
import iconeSair from "../assets/img/icone-sair.png";
import iconeLogo from "../assets/img/logo-escrita.png";
import iconeCargo from "../assets/img/icone-cargo.png";

function Localizacoes() {
  const [localizacoes, setLocalizacoes] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // ✅ identifica a rota atual

  // 🔄 Carrega as localizações da API
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

  // 🔍 Filtragem da busca
  const localizacoesFiltradas = localizacoes.filter((loc) =>
    `${loc.estado} ${loc.cidade}`.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="pagina-localizacoes">
      <header>
        <button onClick={() => navigate("/escolha")} className="logo-btn">
          <img src={iconeLogo} alt="Logo da empresa" className="logo-img" />
        </button>
      </header>

      {/* ✅ Sidebar com item ativo */}
      <aside className="sidebar">
        <ul>
          <li
            className={`sidebar-item ${
              location.pathname === "/visualizar" ? "ativo" : ""
            }`}
            onClick={() => navigate("/visualizar")}
          >
            <img src={iconeTabela} alt="Home" className="icon-img" />
            <span className="label">Home</span>
          </li>

          <li
            className={`sidebar-item ${
              location.pathname === "/localizacao" ? "ativo" : ""
            }`}
            onClick={() => navigate("/localizacao")}
          >
            <img src={iconeLocalizacao} alt="Localizações" className="icon-img" />
            <span className="label">Localizações</span>
          </li>

          <li
            className={`sidebar-item ${
              location.pathname === "/cargo" ? "ativo" : ""
            }`}
            onClick={() => navigate("/cargo")}
          >
            <img src={iconeCargo} alt="Cargos" className="icon-img" />
            <span className="label">Cargos</span>
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
            <img
              src={iconeLocalizacao}
              alt="Ícone Localização"
              className="title-icon"
            />
            <span className="separator">|</span>
            <h1 className="titulo">Localizações</h1>
          </div>

          <p className="subtitulo">
            Aqui você pode visualizar a tabela de localizações da empresa,
            mostrando o ID, Estado e Cidade de cada registro, informações que
            serão necessárias para cadastrar ou referenciar outros dados.
          </p>

          {/* 🔍 Campo de busca com ícone de lupa */}
          <label htmlFor="busca" className="input-pesquisa">
            <img src={iconeLupa} alt="Ícone de busca" className="icone-lupa" />
            <input
              id="busca"
              type="text"
              placeholder="Buscar por estado ou cidade..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </label>
        </div>

        <div className="tabela-container">
          {localizacoesFiltradas.length > 0 ? (
            <table className="tabela-localizacoes">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Estado</th>
                  <th>Cidade</th>
                </tr>
              </thead>
              <tbody>
                {localizacoesFiltradas.map((loc) => (
                  <tr key={loc.id}>
                    <td>{loc.id}</td>
                    <td>{loc.estado}</td>
                    <td>{loc.cidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Nenhuma localização encontrada.
            </p>
          )}
        </div>
      </main>

      {mostrarPopup && (
        <div className="popup">
          <span className="fechar" onClick={() => setMostrarPopup(false)}>
            ×
          </span>
          <h2>Inserir Localização</h2>
        </div>
      )}
    </div>
  );
}

export default Localizacoes;
