import api from "./api";

const cargoService = {
  listar: () => api.get("/cargo/listar"), // Ajuste a rota conforme sua API
};

export default cargoService;
