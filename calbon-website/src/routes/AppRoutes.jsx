import { Routes, Route } from "react-router-dom";
import Login from "../components/login";
import Escolha from "../components/Escolha";
import Visualizar from "../components/Visualizar";
import Dashboard from "../components/Dashboard";
import Localizacoes from "../components/Localizacoes";
import EditarFuncionario from "../components/EditarFuncionario";
import RemoverFuncionario from "../components/RemoverFuncionario";
import InserirFuncionario from "../components/InserirFuncionario";
import ChatBot from "../components/ChatBot";
import Cargo from "../components/Cargo";
import RotaProtegida from "./RotaProtegida"; // ✅ adicionado

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🔓 Rota pública */}
      <Route path="/" element={<Login />} />

      {/* 🔐 Rotas protegidas */}
      <Route
        path="/escolha"
        element={
          <RotaProtegida>
            <Escolha />
          </RotaProtegida>
        }
      />
      <Route
        path="/visualizar"
        element={
          <RotaProtegida>
            <Visualizar />
          </RotaProtegida>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RotaProtegida>
            <Dashboard />
          </RotaProtegida>
        }
      />
      <Route
        path="/localizacao"
        element={
          <RotaProtegida>
            <Localizacoes />
          </RotaProtegida>
        }
      />
      <Route
        path="/editarFuncionario"
        element={
          <RotaProtegida>
            <EditarFuncionario />
          </RotaProtegida>
        }
      />
      <Route
        path="/removerFuncionario"
        element={
          <RotaProtegida>
            <RemoverFuncionario />
          </RotaProtegida>
        }
      />
      <Route
        path="/inserirFuncionario"
        element={
          <RotaProtegida>
            <InserirFuncionario />
          </RotaProtegida>
        }
      />
      <Route
        path="/chatbot"
        element={
          <RotaProtegida>
            <ChatBot />
          </RotaProtegida>
        }
      />
      <Route
        path="/cargo"
        element={
          <RotaProtegida>
            <Cargo />
          </RotaProtegida>
        }
      />
    </Routes>
  );
}
