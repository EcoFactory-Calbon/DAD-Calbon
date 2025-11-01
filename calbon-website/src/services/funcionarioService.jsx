import api from "./api";

const FuncionarioService = {
  // 🔹 Lista todos os funcionários da empresa logada
listar: () => {
  const cnpj =
    sessionStorage.getItem("empresaCnpj") ||
    localStorage.getItem("empresaCnpj");

  console.log("📡 Requisitando funcionários da empresa:", cnpj);

  return api.get(`/funcionario/buscarEmpresa/${cnpj}`).then((res) => {
    console.log("📥 Resposta do listar:", res.data);
      console.log("📦 Dados recebidos do backend (listar):", res.data);
    return res;
  });
},


  // 🔹 Insere novo funcionário
  inserir: (dados) => {
    console.log("📦 Dados enviados para API:", dados);

    return api.post("/funcionario/inserir", JSON.stringify(dados), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // 🔹 Exclui funcionário pelo ID
  excluir: (id) => api.delete(`/funcionario/excluir/${id}`),

  // 🔹 Atualiza perfil (endpoint genérico, usado por funcionários)
  atualizarPerfil: (dadosAtualizados) => {
    console.log("✏️ Atualizando perfil:", dadosAtualizados);

    return api.patch(`/funcionario/AtualizarPerfil`, JSON.stringify(dadosAtualizados), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // 🔹 Atualiza funcionário pelo site (admin/empresa)
  atualizarPorSite: (numeroCracha, dadosAtualizados) => {
    console.log("🌐 Atualizando funcionário via site:", numeroCracha, dadosAtualizados);

    return api.patch(
      `/funcionario/AtualizarPorSite/${numeroCracha}`,
      JSON.stringify(dadosAtualizados),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  // 🔹 Lista localizações (cidades, unidades etc.)
  listarLocalizacoes: () => api.get("/localizacao/listar"),
};

export default FuncionarioService;
