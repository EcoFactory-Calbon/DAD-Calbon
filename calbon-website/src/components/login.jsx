import "../styles/login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

function Login() {
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // 🔹 Agora é uma função async, então pode usar await
  async function logar(e) {
  e.preventDefault();
  setErro("");

  try {
    const dados = await AuthService.login(cnpj, senha);

    // Salva token e dados da empresa
    localStorage.setItem("token", dados.token);
    localStorage.setItem("empresaNome", dados.nome);
    localStorage.setItem("empresaCnpj", dados.cnpj);

    // Redireciona para a página de escolha
    navigate("/escolha");
  } catch (err) {
    if (err.response && err.response.status === 401) {
      setErro("CNPJ ou senha inválidos!");
    } else {
      setErro("Erro ao tentar fazer login. Tente novamente mais tarde.");
    }
  }
}


  return (
    <div className="login">
      <div className="login-card">
        <h1 className="titulo-login">Faça Login</h1>

        <form className="login-form" onSubmit={logar}>
          <div className="input-group">
            <label htmlFor="cnpj">CNPJ</label>
            <input
              type="text"
              id="cnpj"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="00.000.000/0000-00"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="******"
              required
            />
          </div>

          {erro && <p className="erro-login">{erro}</p>}

          <button type="submit" className="entrar-crud">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
