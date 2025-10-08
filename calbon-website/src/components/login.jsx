import '../styles/login.css';
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function Login() {
    const [cnpj, setCnpj] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    async function logar(e) {
        e.preventDefault();
        setLoading(true);

        const dados = { 
            cnpj: cnpj, 
            senha: senha 
        };

        try {
            const req = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });

            const res = await req.json();

            if (!res.sucesso) {
                alert(res.message);
                return;
            }

            alert("Login realizado com sucesso!");
            // navigate("/home"); // descomente quando tiver rota
        } catch (error) {
            alert("Erro ao realizar login: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login">
            <div className="login-card">
                <h1 className="titulo">Faça Login</h1>

                <form className="login-form" onSubmit={logar}>
                    {/* Campo de CNPJ */}
                    <div className="input-group">
                        <label htmlFor="cnpj">CNPJ</label>
                        <input
                            type="text"
                            id="cnpj"
                            name="cnpj"
                            placeholder="00.000.000/0000-00"
                            onChange={(e) => setCnpj(e.target.value)}
                            value={cnpj}
                            required
                        />
                    </div>

                    {/* Campo de Senha */}
                    <div className="input-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="******"
                            onChange={(e) => setSenha(e.target.value)}
                            value={senha}
                            required
                        />
                        <div className="password-header">
                            <a href="#" className="esqueceusenha">
                                Esqueceu a senha?
                            </a>
                        </div>
                    </div>
                    
                    {/* Checkbox "Lembrar de mim" */}
                    <div className="lembrar-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Lembrar de mim</label>
                    </div>

                    {/* Botão de Entrar */}
                    <input 
                        type="submit"
                        className="entrar-crud"
                        value={loading ? "Carregando..." : "Entrar"}
                        disabled={loading}
                    />
                </form>

                {/* Divisor "OU" */}
                <div className="divider">ou</div>

                {/* Opções de Login Externas */}
                <div className="opcoes">
                    <button className="btn-opcao">
                        <span className="icone-google">G</span> Entrar com Google
                    </button>
                </div>

                {/* Link de Cadastro */}
                <div className="cadastro">
                    Não tem uma conta?{' '}
                    <a href="#" className="cadastro-link">
                        Crie uma conta
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
