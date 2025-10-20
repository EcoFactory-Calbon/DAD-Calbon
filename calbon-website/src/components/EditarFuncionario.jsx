    import React, { useState, useEffect } from "react";
    import "../styles/editar.css"; // se tiver um CSS específico

    function EditarFuncionario({ funcionarioSelecionado, onSalvar, onFechar }) {
    const [form, setForm] = useState({
        numeroCracha: "",
        nome: "",
        sobrenome: "",
        email: "",
        cargo: "",
        cidade: "",
        estado: "",
        is_gestor: false,
    });

    // Carrega os dados do funcionário quando o componente abre
    useEffect(() => {
        if (funcionarioSelecionado) {
        const [cidade, estado] = funcionarioSelecionado.localizacao
            ? funcionarioSelecionado.localizacao.split(" - ")
            : ["", ""];

        setForm({
            numeroCracha: funcionarioSelecionado.numeroCracha || "",
            nome: funcionarioSelecionado.nome || "",
            sobrenome: funcionarioSelecionado.sobrenome || "",
            email: funcionarioSelecionado.email || "",
            cargo: funcionarioSelecionado.cargo || "",
            cidade,
            estado,
            is_gestor: funcionarioSelecionado.is_gestor || false,
        });
        }
    }, [funcionarioSelecionado]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: name === "is_gestor" ? value === "sim" : value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Chama a função passada por props para salvar as alterações
        onSalvar({
        ...form,
        localizacao: `${form.cidade} - ${form.estado.toUpperCase()}`,
        });
    }

    if (!funcionarioSelecionado) return null; // não mostra nada se ninguém estiver sendo editado

    return (
        <div className="popup-editar">
        <div className="popup-conteudo">
            <h2>Editar Funcionário</h2>
            <form onSubmit={handleSubmit} className="form-editar">
            <label>
                Nº Crachá
                <input
                type="text"
                name="numeroCracha"
                value={form.numeroCracha}
                readOnly
                />
            </label>

            <label>
                Nome
                <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                />
            </label>

            <label>
                Sobrenome
                <input
                type="text"
                name="sobrenome"
                value={form.sobrenome}
                onChange={handleChange}
                required
                />
            </label>

            <label>
                E-mail
                <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                />
            </label>

            <label>
                Cargo
                <input
                type="text"
                name="cargo"
                value={form.cargo}
                onChange={handleChange}
                required
                />
            </label>

            <label>
                Cidade
                <input
                type="text"
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                required
                />
            </label>

            <label>
                Estado
                <input
                type="text"
                name="estado"
                value={form.estado}
                onChange={handleChange}
                required
                />
            </label>

            <label>
                É Gestor?
                <select
                name="is_gestor"
                value={form.is_gestor ? "sim" : "não"}
                onChange={handleChange}
                >
                <option value="sim">Sim</option>
                <option value="não">Não</option>
                </select>
            </label>

            <div className="botoes-editar">
                <button type="submit" className="btn-salvar">
                Salvar
                </button>
                <button
                type="button"
                className="btn-cancelar"
                onClick={onFechar}
                >
                Cancelar
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    }

    export default EditarFuncionario;
