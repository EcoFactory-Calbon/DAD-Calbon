import api from "./api";

const LocalizacaoService = {
  listar: () => api.get("/localizacao/listar"),
};

export default LocalizacaoService;
