import { useState, useRef, useEffect } from "react";
import FuncionarioService from "../services/funcionarioService";
import "../styles/Inserir.css";

const InserirFuncionario = ({ onClose, onAddFuncionario }) => {
  const [form, setForm] = useState({
    numeroCracha: "",
    nome: "",
    sobrenome: "",
    email: "",
    is_gestor: false,
    id_cargo: "",
    id_localizacao: "",
  });

  const [popupMsg, setPopupMsg] = useState(""); // 🔹 mensagem do pop-up
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

  // Atualiza campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Função auxiliar: mostra pop-up e some após 3s
  const showPopup = (mensagem) => {
    setPopupMsg(mensagem);
    setTimeout(() => setPopupMsg(""), 3000);
  };

  // Envia dados pro backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { numeroCracha, nome, sobrenome, email, id_cargo, id_localizacao } = form;

    if (!numeroCracha) return showPopup("Número do crachá inválido!");
    if (!nome || nome.length < 3) return showPopup("Nome inválido! Mínimo 3 caracteres.");
    if (!sobrenome || sobrenome.length < 3) return showPopup("Sobrenome inválido!");
    if (!email.includes("@")) return showPopup("Email inválido!");
    if (!id_cargo) return showPopup("ID do cargo inválido!");
    if (!id_localizacao) return showPopup("ID da localização inválido!");

    try {
      const dados = {
        numeroCracha: Number(form.numeroCracha),
        nome: form.nome,
        sobrenome: form.sobrenome,
        email: form.email,
        senha: form.senha || "senha123",
        id_cargo: Number(form.id_cargo),
        id_localizacao: Number(form.id_localizacao),
        is_gestor: Boolean(form.is_gestor),
        primeiro_acesso: true,
      };

      console.log("📦 Enviando dados para API:", dados);

      const response = await FuncionarioService.inserir(dados);
      showPopup("Funcionário cadastrado com sucesso! ✅");

      const todosFuncionarios = await FuncionarioService.listar();
      console.log("👀 Funcionários cadastrados:", todosFuncionarios.data);

      if (onAddFuncionario) onAddFuncionario(response.data);

      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error("❌ Erro ao cadastrar funcionário:", error);
      showPopup("Erro ao cadastrar funcionário!");
    }
  };

  return (
    <div className="popup">
      <div className="popup-content" ref={popupRef}>
        <span className="fechar" onClick={onClose}>×</span>
        <h2>Cadastrar Novo Funcionário</h2>

        {/* Pop-up de aviso */}
        {popupMsg && <div className="popup-alert">{popupMsg}</div>}

        <form className="popup-form" onSubmit={handleSubmit}>
          <div className="coluna">
            <div className="form-group">
              <label>Nº Crachá</label>
              <input
                type="number"
                name="numeroCracha"
                value={form.numeroCracha}
                onChange={handleChange}
              />
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

          <div className="coluna">
            <div className="form-group">
              <label>ID Cargo</label>
              <input
                type="number"
                name="id_cargo"
                value={form.id_cargo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>ID Localização</label>
              <input
                type="number"
                name="id_localizacao"
                value={form.id_localizacao}
                onChange={handleChange}
              />
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

          <div className="form-botoes">
            <button type="submit" className="btn-salvar">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InserirFuncionario;
