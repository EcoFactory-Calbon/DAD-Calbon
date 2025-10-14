import React, { useEffect, useState } from "react";
import FuncionarioService from "../services/funcionarioService";
import "../styles/visualizar.css";

// ========================================================
// IMPORTAÇÃO CORRIGIDA DOS ASSETS (Imagens)
// O caminho "../img/" é relativo de "src/components/" para "src/img/"
// ========================================================
import iconeHome from "../img/icone-home.png";
import iconeTabela from "../img/icone-tabela.png";
import iconeAdicionar from "../img/icone-adicionar.png";
import iconeGrafico from "../img/icone-grafico.png";
import iconeSair from "../img/icone-sair.png";
import iconeLupa from "../img/icone-lupa.png";

function VisualizarFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [busca, setBusca] = useState("");

    // Função para buscar os funcionários da API
    const carregarFuncionarios = async () => {
        try {
            const response = await FuncionarioService.listar();
                setFuncionarios(response.data);
                //console.log(response.data); // para conferir
        } catch (err) {
            console.error("Erro ao carregar funcionários:", err);
        }
    };

    // Carrega ao montar o componente
    useEffect(() => {
        carregarFuncionarios();
    }, []);

    // Filtro de busca por nome
    const funcionariosFiltrados = funcionarios.filter((f) =>
    f.nome?.toLowerCase().includes(busca.toLowerCase())
);

    return (
        <div className="pagina-visualizar">
            <header>
                <button className="logo-btn">
                    {/* USO DA VARIÁVEL IMPORTADA */}
                </button>
            </header>

            <aside className="sidebar">
                <ul>
                    <a href="/home" className="sidebar-item">
                        {/* USO DA VARIÁVEL IMPORTADA */}
                        <img src={iconeHome} alt="Home" className="icon-img" />
                        <span className="label">Home</span>
                    </a>
                    <a href="/visualizar" className="sidebar-item">
                        {/* USO DA VARIÁVEL IMPORTADA */}
                        <img src={iconeTabela} alt="Visualizar" className="icon-img" />
                        <span className="label">Visualizar</span>
                    </a>
                    <a href="/inserir" className="sidebar-item">
                        {/* USO DA VARIÁVEL IMPORTADA */}
                        <img src={iconeAdicionar} alt="Inserir" className="icon-img" />
                        <span className="label">Inserir</span>
                    </a>
                    <a href="/dashboard" className="sidebar-item">
                        {/* USO DA VARIÁVEL IMPORTADA */}
                        <img src={iconeGrafico} alt="Dashboard" className="icon-img" />
                        <span className="label">Dashboard</span>
                    </a>
                </ul>
                <hr className="divisao-aside" />
                <button id="back-btn">
                    {/* USO DA VARIÁVEL IMPORTADA */}
                    <img src={iconeSair} alt="Voltar" className="icon-img" />
                    <span className="label">Voltar</span>
                </button>
            </aside>

            <main>
                <div className="title-container">
                    <div className="title-row">
                        {/* USO DA VARIÁVEL IMPORTADA */}
                        <img
                            src={iconeTabela}
                            alt="Ícone Tabela"
                            className="title-icon"
                        />
                        <span className="separator">|</span>
                        <h1 className="titulo">Visualizar Registros</h1>
                    </div>
                    <p className="subtitulo">
                        Aqui você pode visualizar, editar ou excluir todos os registros de
                        funcionários da sua empresa:
                    </p>
                </div>

                {/* Barra superior */}
                <div className="barra-superior">
                    <label htmlFor="busca" className="input-pesquisa">
                        {/* USO DA VARIÁVEL IMPORTADA */}
                        <img
                            src={iconeLupa}
                            alt="Ícone de busca"
                            className="icone-lupa"
                        />
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

                    <button id="btnCadastrar" className="btn-padrao botao-cadastrar">
                        {/* USO DA VARIÁVEL IMPORTADA */}
                        <img
                            src={iconeAdicionar}
                            alt="Ícone de adicionar"
                            className="icone-cadastro"
                        />
                        Cadastrar Funcionário
                    </button>
                </div>

                {/* Tabela */}
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
                                <td>
                                <button className="btn-editar">Editar</button>
                                <button className="btn-excluir">Excluir</button>
                            </td>
                            </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" style={{ textAlign: "center" }}>
                                        Nenhum funcionário encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default VisualizarFuncionarios;