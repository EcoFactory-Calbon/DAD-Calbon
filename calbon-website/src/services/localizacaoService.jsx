// src/services/localizacaoService.js
import api from "./api";

const LocalizacaoService = {
    listar: () => api.get("/localizacao/listar"),
    inserir: (dados) => api.post("/localizacao/inserir", dados),
    atualizarParcial: (id, dados) => api.patch(`/localizacao/atualizar/${id}`, dados),
    excluir: (id) => api.delete(`/localizacao/excluir/${id}`),
    buscarPorEstado: (estado) => api.get(`/localizacao/buscar/${estado}`),
};

export default LocalizacaoService;
