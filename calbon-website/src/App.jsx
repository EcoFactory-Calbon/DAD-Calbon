import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    localStorage.setItem("token", "mocked_token_aqui");
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
