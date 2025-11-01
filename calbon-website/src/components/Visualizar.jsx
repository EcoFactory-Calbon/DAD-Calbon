import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ Importa useLocation
import FuncionarioService from "../services/funcionarioService";
import InserirFuncionario from "./InserirFuncionario";
import EditarFuncionario from "./EditarFuncionario";
import "../styles/visualizar.css";

import iconeTabela from "../assets/img/icone-tabela.png";
import iconeLocalizacao from "../assets/img/icone-localizacao.png";
import iconeAdicionar from "../assets/img/icone-adicionar.png";
import iconeSair from "../assets/img/icone-sair.png";

import iconeLupa from "../assets/img/icone-lupa.png";
import iconeLogo from "../assets/img/logo-escrita.png";
import iconeCargo from "../assets/img/icone-cargo.png";

function VisualizarFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [menuAberto, setMenuAberto] = useState(null);
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);
  const [popupMsg, setPopupMsg] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Captura a rota atual

  // 🔹 Exibir popup temporário
  const showPopup = (mensagem, tipo = "sucesso") => {
    setPopupMsg({ texto: mensagem, tipo });
    setTimeout(() => setPopupMsg(null), 3000);
  };

  // 🔹 Adiciona funcionário novo à lista
  const adicionarFuncionario = (novo) => {
    setFuncionarios((prev) => [...prev, novo]);
    showPopup(
      `Funcionário ${novo.nome} ${novo.sobrenome} adicionado com sucesso!`,
      "sucesso"
    );
  };

  // 🔹 Carrega funcionários da API
  const carregarFuncionarios = async (cnpj) => {
    try {
      const response = await FuncionarioService.listar(cnpj);
      setFuncionarios(response.data);
    } catch (err) {
      console.error("Erro ao carregar funcionários:", err);
      showPopup("Erro ao carregar funcionários. Tente novamente mais tarde.", "erro");
    }
  };

  useEffect(() => {
    const cnpj =
      sessionStorage.getItem("empresaCnpj") || localStorage.getItem("empresaCnpj");

    if (!cnpj) {
      console.warn("CNPJ não encontrado. Redirecionando para login...");
      navigate("/");
      return;
    }

    carregarFuncionarios(cnpj);
  }, [navigate]);

  const funcionariosFiltrados = funcionarios.filter((f) =>
    f.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  const toggleMenu = (id) => setMenuAberto(menuAberto === id ? null : id);

  const editarFuncionario = (func) => {
    setFuncionarioEditando(func);
    setMenuAberto(null);
  };

  const excluirFuncionario = async (id) => {
    if (window.confirm("Deseja realmente excluir este funcionário?")) {
      try {
        await FuncionarioService.excluir(id);
        setFuncionarios((prev) => prev.filter((f) => f.numeroCracha !== id));
        showPopup("Funcionário excluído com sucesso!", "sucesso");
      } catch (err) {
        console.error("Erro ao excluir funcionário:", err);
        showPopup("Erro ao excluir funcionário. Tente novamente.", "erro");
      }
    }
    setMenuAberto(null);
  };

  // Fecha menu de ações ao clicar fora
  useEffect(() => {
    const handleClickFora = (event) => {
      const menuAtivo = document.querySelector(".menu-acoes");
      if (menuAtivo && !menuAtivo.contains(event.target)) {
        setMenuAberto(null);
      }
    };
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  return (
    <div className="pagina-visualizar">
      <header>
        <button onClick={() => navigate("/escolha")} className="logo-btn">
          <img src={iconeLogo} alt="Logo da empresa" className="logo-img" />
        </button>
      </header>

      {/* ✅ Sidebar com destaque automático */}
      <aside className="sidebar">
        <ul>
          <li
            className={`sidebar-item ${
              location.pathname === "/visualizar" ? "ativo" : ""
            }`}
            onClick={() => navigate("/visualizar")}
          >
            <img src={iconeTabela} alt="Gerenciamento" className="icon-img" />
            <span className="label">Gerenciamento</span>
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
        <div className="title-container">
          <div className="title-row">
            <img src={iconeTabela} alt="Ícone Tabela" className="title-icon" />
            <span className="separator">|</span>
            <h1 className="titulo">Visualizar Registros</h1>
          </div>
          <p className="subtitulo">
            Aqui você pode visualizar, editar ou excluir todos os registros de funcionários da sua empresa:
          </p>
        </div>

        <div className="barra-superior">
          <label htmlFor="busca" className="input-pesquisa">
            <img src={iconeLupa} alt="Ícone de busca" className="icone-lupa" />
            <input
              id="busca"
              type="text"
              placeholder="Buscar por nome"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </label>

          <button
            className="btn-padrao botao-cadastrar"
            onClick={() => setMostrarPopup(true)}
          >
            <img src={iconeAdicionar} alt="Ícone de adicionar" className="icone-cadastro" />
            Cadastrar Funcionário
          </button>
        </div>

        <div className="tabela-container">
          <table id="tabelaFuncionarios">
            <thead>
              <tr>
                <th>Nº Crachá</th>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionariosFiltrados.length > 0 ? (
                funcionariosFiltrados.map((f) => (
                  <tr key={f.numeroCracha}>
                    <td>{f.numeroCracha}</td>
                    <td>{f.nome}</td>
                    <td>{f.sobrenome}</td>
                    <td>{f.email}</td>
                    <td className="acoes">
                      {menuAberto === f.numeroCracha ? (
                        <div className="menu-acoes">
                          <button onClick={() => editarFuncionario(f)}>✏️ Editar</button>
                          <button onClick={() => excluirFuncionario(f.numeroCracha)}>🗑️ Remover</button>
                        </div>
                      ) : (
                        <span
                          className="tres-pontinhos"
                          onClick={() => toggleMenu(f.numeroCracha)}
                        >
                          ⋮
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Nenhum funcionário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {mostrarPopup && (
        <InserirFuncionario
          onAddFuncionario={adicionarFuncionario}
          onClose={() => setMostrarPopup(false)}
        />
      )}

      {funcionarioEditando && (
        <EditarFuncionario
          funcionarioSelecionado={funcionarioEditando}
          onFechar={() => setFuncionarioEditando(null)}
          onSalvar={(funcAtualizado) => {
            setFuncionarios((prev) =>
              prev.map((f) =>
                f.numeroCracha === funcAtualizado.numeroCracha ? funcAtualizado : f
              )
            );
            setFuncionarioEditando(null);
            showPopup("Funcionário atualizado com sucesso!", "sucesso");
          }}
        />
      )}

      {/* 🔹 Popup de notificação */}
      {popupMsg && (
        <div className={`mensagem-popup ${popupMsg.tipo}`}>
          {popupMsg.texto}
        </div>
      )}
    </div>
  );
}

export default VisualizarFuncionarios;
