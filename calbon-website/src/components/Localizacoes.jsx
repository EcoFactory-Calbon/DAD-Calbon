// src/components/Localizacoes.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LocalizacaoService from "../services/localizacaoService";
import "../styles/localizacao.css";

function Localizacoes() {
  const [localizacoes, setLocalizacoes] = useState([]);
  const [erro, setErro] = useState("");
  const popupRef = useRef(null);
  const navigate = useNavigate();

  // Carrega as localizações da API
  useEffect(() => {
    const fetchLocalizacoes = async () => {
      try {
        const response = await LocalizacaoService.listar();
        setLocalizacoes(response.data);
      } catch (err) {
        console.error("Erro ao buscar localizações:", err);
        setErro("Não foi possível carregar as localizações.");
      }
    };

    fetchLocalizacoes();
  }, []);

  // Fecha popup ao clicar fora
  useEffect(() => {
    const handleClickFora = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        navigate("/home"); // volta para home ao fechar
      }
    };
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, [navigate]);

  return (
    <div className="pagina-localizacoes">
      <div className="popup" ref={popupRef}>
        <span className="fechar" onClick={() => navigate("/home")}>×</span>
        <h2>Localizações</h2>

        {erro && <p className="erro-msg">{erro}</p>}

        {localizacoes.length > 0 ? (
          <table className="localizacoes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Estado</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
              {localizacoes.map((loc) => (
                <tr key={loc.id}>
                  <td>{loc.id}</td>
                  <td>{loc.estado}</td>
                  <td>{loc.cidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma localização encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default Localizacoes;
