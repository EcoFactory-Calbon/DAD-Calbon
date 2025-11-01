    import React, { useState, useEffect } from "react";
    import "../styles/editar.css";
    import FuncionarioService from "../services/funcionarioService";

    function EditarFuncionario({ funcionarioSelecionado, onSalvar, onFechar }) {
    const [form, setForm] = useState({
        numeroCracha: "",
        nome: "",
        sobrenome: "",
        email: "",
        is_gestor: false,
    });

    const [dadosOriginais, setDadosOriginais] = useState({});
    const [popupMsg, setPopupMsg] = useState("");
    const [popupTipo, setPopupTipo] = useState("erro");

    // 🔹 Exibe pop-up temporário
    const showPopup = (mensagem, tipo = "erro") => {
        setPopupMsg(mensagem);
        setPopupTipo(tipo);
        setTimeout(() => setPopupMsg(""), 3000);
    };

    // 🔹 Carrega dados do funcionário
    useEffect(() => {
        if (funcionarioSelecionado) {
        const dados = {
            numeroCracha: funcionarioSelecionado.numeroCracha || "",
            nome: funcionarioSelecionado.nome || "",
            sobrenome: funcionarioSelecionado.sobrenome || "",
            email: funcionarioSelecionado.email || "",
            is_gestor: !!funcionarioSelecionado.is_gestor,
        };
        console.log("🟢 useEffect - Dados carregados no formulário:", dados);
        setForm(dados);
        setDadosOriginais(dados);
        }
    }, [funcionarioSelecionado]);

    // 🔹 Atualiza campos do formulário
    function handleChange(e) {
        const { name, value } = e.target;
        const novoValor = name === "is_gestor" ? value === "sim" : value;

        console.log(`✏️ Campo alterado: ${name} →`, novoValor);

        setForm((prev) => ({
        ...prev,
        [name]: novoValor,
        }));
    }

    // 🔹 Detecta campos alterados
    function getCamposAlterados() {
        const alterados = {};
        Object.keys(form).forEach((campo) => {
        if (campo === "numeroCracha") return;
        const valorAtual = form[campo];
        const valorOriginal = dadosOriginais[campo];

        if (valorAtual !== valorOriginal) {
            alterados[campo] = valorAtual;
        }
        });

        console.log("🔍 Campos alterados detectados:", alterados);
        return alterados;
    }

    // 🔹 Envia PATCH
    async function handleSubmit(e) {
        e.preventDefault();

        console.log("📋 Estado atual do form antes de enviar:", form);

        const camposAlterados = getCamposAlterados();
        if (Object.keys(camposAlterados).length === 0) {
        showPopup("Nenhuma alteração foi feita.");
        return;
        }

        const payload = camposAlterados;
        console.log("🚀 Enviando PATCH:", {
        numeroCracha: form.numeroCracha,
        body: payload,
        });

        try {
        const response = await FuncionarioService.atualizarPorSite(
            form.numeroCracha,
            payload
        );

        console.log("✅ Resposta da API:", response.data);

        const valorIsGestor = response.data.is_gestor ?? "(não veio)";
        console.log("🧠 Valor retornado de is_gestor:", valorIsGestor);

        const funcionarioAtualizado = {
            ...form,
            ...response.data,
            is_gestor:
            valorIsGestor === "(não veio)" ? form.is_gestor : valorIsGestor,
        };

        console.log("🧩 Funcionário final após merge de resposta:", funcionarioAtualizado);

        showPopup("Funcionário atualizado com sucesso! ✅", "sucesso");

        setTimeout(() => {
            onSalvar(funcionarioAtualizado);
            onFechar();
        }, 1500);
        } catch (err) {
        console.error("❌ Erro ao atualizar funcionário:", err);
        if (err.response) {
            console.error("📨 Erro resposta do servidor:", err.response.data);
            console.error("📨 Código:", err.response.status);
        }
        showPopup("Erro ao atualizar funcionário. Verifique os dados e tente novamente.");
        }
    }

    if (!funcionarioSelecionado) return null;

    return (
        <div className="popup-editar">
        <div className="popup-conteudo">
            <h2>Editar Funcionário</h2>

            {popupMsg && (
            <div className={`popup-alert ${popupTipo}`}>{popupMsg}</div>
            )}

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
                placeholder="Nome"
                />
            </label>

            <label>
                Sobrenome
                <input
                type="text"
                name="sobrenome"
                value={form.sobrenome}
                onChange={handleChange}
                placeholder="Sobrenome"
                />
            </label>

            <label>
                E-mail
                <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail"
                />
            </label>
            <div className="botoes-editar">
                <button type="submit" className="btn-salvar">
                Salvar
                </button>
                <button type="button" className="btn-cancelar" onClick={onFechar}>
                Cancelar
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    }

    export default EditarFuncionario;
