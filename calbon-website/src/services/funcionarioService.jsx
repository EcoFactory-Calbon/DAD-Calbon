// src/services/funcionarioService.js
import api from "./api";

const FuncionarioService = {
    listar: () => api.get("/funcionario/listar"),
    inserir: (dados) => api.post("/funcionario/inserir", dados),
    atualizar: (id, dados) => api.put(`/funcionario/atualizar/${id}`, dados),
    atualizarParcial: (id, dados) => api.patch(`/funcionario/atualizar/${id}`, dados),
    excluir: (id) => api.delete(`/funcionario/excluir/${id}`),
    buscarPorCracha: (cracha) => api.get(`/funcionario/buscarCracha/${cracha}`),
};

export default FuncionarioService;
