// src/routes/RotaProtegida.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function RotaProtegida({ children }) {
  // Aqui usamos o token (pode ser JWT real ou mockado)
  const token = localStorage.getItem("token");

  // Se não existir token, redireciona para login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se estiver logado, renderiza o conteúdo
  return children;
}
