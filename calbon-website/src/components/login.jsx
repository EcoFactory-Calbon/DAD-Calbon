import '../styles/login.css';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    function logar(e) {
        e.preventDefault(); // evita que a página recarregue
        navigate("/home");  // vai para a Home APENAS quando clicar
    }

    return (
        <div className="login">
            <div className="login-card">
                <h1 className="titulo">Faça Login</h1>

                <form className="login-form" onSubmit={logar}>
                    <div className="input-group">
                        <label htmlFor="cnpj">CNPJ</label>
                        <input type="text" id="cnpj" placeholder="00.000.000/0000-00" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" placeholder="******" />
                    </div>

                    <button type="submit" className="entrar-crud">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
