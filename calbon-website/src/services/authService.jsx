    import axios from "axios";

    const api = axios.create({
    baseURL: "https://api-sql-pdlt.onrender.com",
    });

    const AuthService = {
    async login(cnpj, senha) {
        try {
        console.log("🔹 Enviando login para API:", { cnpj, senha });

        const response = await api.post("/auth/empresa/login", { cnpj, senha });

        console.log("✅ Resposta da API:", response.data);
        return response.data; // deve conter token, nome e cnpj
        } catch (error) {
        if (error.response) {
            console.error("❌ Erro de resposta da API:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("⚠️ Nenhuma resposta da API. Verifique CORS ou URL.");
        } else {
            console.error("🚨 Erro ao configurar requisição:", error.message);
        }
        throw error;
        }
    },
    };

    export default AuthService;
