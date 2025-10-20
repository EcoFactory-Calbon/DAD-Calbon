import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Login from './components/Login';
import Escolha from './components/Escolha';
import Visualizar from './components/Visualizar';
import Dashboard from './components/Dashboard'; // novo componente
import Localizacoes from './components/Localizacoes';
import EditarFuncionario from "./components/EditarFuncionario";
import RemoverFuncionario from "./components/RemoverFuncionario";
import InserirFuncionario from "./components/InserirFuncionario";

function App() {
  useEffect(() => {
    // Mock do token para teste
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWthQGVtYWlsLmNvbSIsIm5vbWthIiwidHlwZSI6IkFETUlOIiwiaWF0IjoxNzYwODk2NDAwLCJleHAiOjE3NjA5MTQ0MDB9.0LtUjCRWXwXYt7lycMSlNg8Lpf8l4IPB2gZuZi0bI3M"
    );
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Página de escolha após login */}
        <Route path="/escolha" element={<Escolha />} />

        {/* Rotas principais */}
        <Route path="/home" element={<Visualizar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/localizacao" element={<Localizacoes />} />

        {/* CRUD */}
        <Route path="/editarFuncionario" element={<EditarFuncionario />} />
        <Route path="/removerFuncionario" element={<RemoverFuncionario />} />
        <Route path="/inserirFuncionario" element={<InserirFuncionario />} />
      </Routes>
    </Router>
  );
}

export default App;
