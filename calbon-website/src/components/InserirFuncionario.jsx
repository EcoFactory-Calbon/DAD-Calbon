    // src/components/InserirFuncionario.js
    import { useState, useRef, useEffect } from "react";
    import FuncionarioService from "../services/funcionarioService";
    import "../styles/Inserir.css";

    const InserirFuncionario = ({ onClose, onAddFuncionario }) => {
    const [form, setForm] = useState({
        numeroCracha: "",
        nome: "",
        sobrenome: "",
        email: "",
        id_cargo: "",
        id_localizacao: "",
        is_gestor: false,
    });

    const popupRef = useRef(null);

    // Fecha o pop-up ao clicar fora
    useEffect(() => {
        const handleClickFora = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose();
        }
        };
        document.addEventListener("mousedown", handleClickFora);
        return () => document.removeEventListener("mousedown", handleClickFora);
    }, [onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { numeroCracha, nome, sobrenome, email, id_cargo, id_localizacao } = form;

        if (!numeroCracha) return alert("Número do crachá inválido!");
        if (!nome || nome.length < 3) return alert("Nome inválido! Mínimo 3 caracteres.");
        if (!sobrenome || sobrenome.length < 3) return alert("Sobrenome inválido!");
        if (!email.includes("@")) return alert("Email inválido!");
        if (!id_cargo) return alert("ID do cargo inválido!");
        if (!id_localizacao) return alert("ID da localização inválido!");

        try {
        const dados = {
            numeroCracha: Number(numeroCracha),
            nome,
            sobrenome,
            email,
            id_cargo: Number(id_cargo),
            id_localizacao: Number(id_localizacao),
            is_gestor: form.is_gestor,
        };

        const response = await FuncionarioService.inserir(dados);
        alert("Funcionário cadastrado com sucesso!");

        if (onAddFuncionario) onAddFuncionario(response.data);
        onClose();
        } catch (error) {
        console.error("Erro ao cadastrar funcionário:", error);
        alert("Erro ao cadastrar funcionário!");
        }
    };

    return (
        <div className="popup">
        <div className="popup-content" ref={popupRef}>
            <span className="fechar" onClick={onClose}>×</span>

            <h2>Cadastrar Novo Funcionário</h2>

            <form className="popup-form" onSubmit={handleSubmit}>
            {/* Coluna Esquerda */}
            <div className="coluna">
                <div className="form-group">
                <label>Nº Crachá</label>
                <input name="numeroCracha" value={form.numeroCracha} onChange={handleChange} />
                </div>

                <div className="form-group">
                <label>Nome</label>
                <input name="nome" value={form.nome} onChange={handleChange} />
                </div>

                <div className="form-group">
                <label>Sobrenome</label>
                <input name="sobrenome" value={form.sobrenome} onChange={handleChange} />
                </div>

                <div className="form-group">
                <label>Email</label>
                <input name="email" value={form.email} onChange={handleChange} />
                </div>
            </div>

            {/* Coluna Direita */}
            <div className="coluna">
                <div className="form-group">
                <label>ID Cargo</label>
                <input name="id_cargo" value={form.id_cargo} onChange={handleChange} />
                </div>

                <div className="form-group">
                <label>ID Localização</label>
                <input name="id_localizacao" value={form.id_localizacao} onChange={handleChange} />
                </div>

                <div className="form-group">
                <label>É Gestor?</label>
                <select
                    name="is_gestor"
                    value={form.is_gestor ? "sim" : "nao"}
                    onChange={(e) =>
                    setForm((prev) => ({ ...prev, is_gestor: e.target.value === "sim" }))
                    }
                >
                    <option value="nao">Não</option>
                    <option value="sim">Sim</option>
                </select>
                </div>
            </div>

            {/* Botão Único */}
            <div className="form-botoes">
                <button type="submit" className="btn-salvar">Cadastrar</button>
            </div>
            </form>
        </div>
        </div>
    );
    };

    export default InserirFuncionario;
