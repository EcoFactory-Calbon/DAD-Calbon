// src/services/empresaService.js
import api from "./api";

const EmpresaService = {
    listar: () => api.get("/empresa/listar"),
    inserir: (dados) => api.post("/empresa/inserir", dados),
    atualizar: (id, dados) => api.put(`/empresa/atualizar/${id}`, dados),
    excluir: (id) => api.delete(`/empresa/excluir/${id}`),
    buscarPorNome: (nome) => api.get(`/empresa/buscar/nome/${nome}`),
    buscarPorCategoria: (idCategoria) => api.get(`/empresa/buscar/categoria/${idCategoria}`),
};

export default EmpresaService;
