import React from "react";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <div className="app-container">
      <div className="page-content">
        <AppRoutes />
      </div>

      <footer>
        <p>© 2025 Restaurante Raízes Nobres — Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
