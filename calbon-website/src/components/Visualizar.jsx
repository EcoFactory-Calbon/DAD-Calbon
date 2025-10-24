import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FuncionarioService from "../services/funcionarioService";
import InserirFuncionario from "./InserirFuncionario";
import "../styles/visualizar.css";

import iconeTabela from "../assets/img/icone-tabela.png";
import iconeLocalizacao from "../assets/img/icone-localizacao.png";
import iconeAdicionar from "../assets/img/icone-adicionar.png";
import iconeLupa from "../assets/img/icone-lupa.png";
import iconeLogo from "../assets/img/logo-escrita.png";

function VisualizarFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [menuAberto, setMenuAberto] = useState(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Função para adicionar funcionário do pop-up
  function adicionarFuncionario(novo) {
    setFuncionarios([...funcionarios, novo]);
    alert(`Funcionário ${novo.nome} ${novo.sobrenome} adicionado com sucesso!`);
  }

  // Carrega os funcionários da API
  const carregarFuncionarios = async () => {
    try {
      const response = await FuncionarioService.listar();
      setFuncionarios(response.data);
    } catch (err) {
      console.error("Erro ao carregar funcionários:", err);
    }
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const funcionariosFiltrados = funcionarios.filter((f) =>
    f.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickFora = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(null);
      }
    };
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const toggleMenu = (id) => setMenuAberto(menuAberto === id ? null : id);

  const editarFuncionario = (id) => {
    alert(`Editar funcionário com crachá ${id}`);
    setMenuAberto(null);
  };

  const excluirFuncionario = async (id) => {
    const confirmacao = window.confirm("Deseja realmente excluir este funcionário?");
    if (confirmacao) {
      try {
        await FuncionarioService.excluir(id);
        setFuncionarios(funcionarios.filter((f) => f.numeroCracha !== id));
        alert("Funcionário excluído com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir funcionário:", err);
      }
    }
    setMenuAberto(null);
  };

  return (
    <div className="pagina-visualizar">
      <header>
        <button onClick={() => navigate("/escolha")} className="logo-btn">
          <img src={iconeLogo} alt="Logo da empresa" className="logo-img" />
        </button>
      </header>

      <aside className="sidebar">
        <ul>
          <li className="sidebar-item" onClick={() => navigate("/visualizar")}>
            <img src={iconeTabela} alt="Gerenciamento" className="icon-img" />
            <span className="label">Gerenciamento</span>
          </li>
          <li className="sidebar-item" onClick={() => navigate("/localizacao")}>
            <img src={iconeLocalizacao} alt="Localizações" className="icon-img" />
            <span className="label">Localizações</span>
          </li>
        </ul>
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
              aria-label="Buscar por nome"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </label>

          <button id="btnPesquisar" className="btn-padrao btn-pesquisar">
            Pesquisar
          </button>

          <button
            id="btnCadastrar"
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
                <th>É Gestor?</th>
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
                    <td>{f.is_gestor ? "Sim" : "Não"}</td>
                    <td className="acoes" ref={menuRef}>
                      {menuAberto === f.numeroCracha ? (
                        <div className="menu-acoes">
                          <button onClick={() => editarFuncionario(f.numeroCracha)}>✏️ Editar</button>
                          <button onClick={() => excluirFuncionario(f.numeroCracha)}>🗑️ Remover</button>
                        </div>
                      ) : (
                        <span className="tres-pontinhos" onClick={() => toggleMenu(f.numeroCracha)}>
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

      {/* Pop-up de inserção */}
      {mostrarPopup && (
        <InserirFuncionario
          onAddFuncionario={adicionarFuncionario}
          onClose={() => setMostrarPopup(false)}
        />
      )}
    </div>
  );
}

export default VisualizarFuncionarios;
