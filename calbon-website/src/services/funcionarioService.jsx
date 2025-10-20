import api from "./api";

const FuncionarioService = {
  listar: () => api.get("/funcionario/listar"),
  inserir: (dados) => api.post("/funcionario/inserir", dados),
  excluir: (id) => api.delete(`/funcionario/excluir/${id}`),
};

export default FuncionarioService;
