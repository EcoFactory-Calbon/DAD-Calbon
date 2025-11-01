    import React, { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import CargoService from "../services/cargoService";
    import "../styles/cargo.css";

    // Ícones
    import iconeLogo from "../assets/img/logo-escrita.png";
    import iconeTabela from "../assets/img/icone-tabela.png";
    import iconeLocalizacao from "../assets/img/icone-localizacao.png";
    import iconeCargo from "../assets/img/icone-cargo.png";
    import iconeLupa from "../assets/img/icone-lupa.png";
    import iconeSair from "../assets/img/icone-sair.png";

    export default function Cargo() {
    const [cargos, setCargos] = useState([]);
    const [busca, setBusca] = useState("");
    const navigate = useNavigate();

    // 🔹 Carrega cargos da API
    useEffect(() => {
        const fetchCargos = async () => {
        try {
            const response = await CargoService.listar();
            setCargos(response.data);
        } catch (err) {
            console.error("Erro ao buscar cargos:", err);
        }
        };
        fetchCargos();
    }, []);

    // 🔍 Filtra cargos pelo nome
    const cargosFiltrados = cargos.filter((cargo) =>
        cargo.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="pagina-cargo">
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
            <li className="sidebar-item ativo" onClick={() => navigate("/cargo")}>
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
            <div className="title-container-cargo">
            <div className="title-row">
                <img src={iconeCargo} alt="Ícone Cargo" className="title-icon" />
                <span className="separator">|</span>
                <h1 className="titulo">Cargos</h1>
            </div>
            <p className="subtitulo">
                Aqui você pode visualizar a lista de cargos cadastrados na empresa,
                incluindo o ID, nome, setor e nível do cargo.
            </p>

            <label htmlFor="busca" className="input-pesquisa">
                <img src={iconeLupa} alt="Ícone de busca" className="icone-lupa" />
                <input
                id="busca"
                type="text"
                placeholder="Buscar por nome do cargo"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                />
            </label>
            </div>

            <div className="tabela-container">
            {cargosFiltrados.length > 0 ? (
                <table className="tabela-cargo">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>ID Setor</th>
                    <th>Nível</th>
                    </tr>
                </thead>
                <tbody>
                    {cargosFiltrados.map((cargo) => (
                    <tr key={cargo.id}>
                        <td>{cargo.id}</td>
                        <td>{cargo.nome}</td>
                        <td>{cargo.id_setor}</td>
                        <td>{cargo.nivel_cargo}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                Nenhum cargo encontrado.
                </p>
            )}
            </div>
        </main>
        </div>
    );
    }
