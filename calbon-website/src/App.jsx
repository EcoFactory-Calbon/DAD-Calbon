// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login'
import Visualizar from './components/Visualizar'



function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* Rota inicial */}
        <Route path="/" element={<Login />} />

        {/* Rota da Home */}
        <Route path="/home" element={<Visualizar />} />

        {/* Qualquer outra rota não reconhecida redireciona para login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App
