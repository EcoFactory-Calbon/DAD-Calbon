import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Escolha from "../components/Escolha";
import Visualizar from "../components/Visualizar";
import Dashboard from "../components/Dashboard";
import Localizacoes from "../components/Localizacoes";
import EditarFuncionario from "../components/EditarFuncionario";
import RemoverFuncionario from "../components/RemoverFuncionario";
import InserirFuncionario from "../components/InserirFuncionario";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/escolha" element={<Escolha />} />
      <Route path="/visualizar" element={<Visualizar />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/localizacao" element={<Localizacoes />} />
      <Route path="/editarFuncionario" element={<EditarFuncionario />} />
      <Route path="/removerFuncionario" element={<RemoverFuncionario />} />
      <Route path="/inserirFuncionario" element={<InserirFuncionario />} />
    </Routes>
  );
}
