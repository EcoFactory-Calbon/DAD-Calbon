// src/components/Dashboard.jsx
import React from "react";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-titulo">Dashboard Empresarial</h1>
      <p className="dashboard-descricao">
        Acompanhe os principais indicadores e métricas da empresa em tempo real.
      </p>

      <div className="dashboard-frame-wrapper">
        <iframe
          title="Power BI Dashboard"
          src="https://app.powerbi.com/view?r=eyJrIjoiNWJiMWMzNmQtNGFjYi00MTU3LWI4NzgtNmRhY2RiMGQ5ZThkIiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9&pageName=ReportSection&navContentPaneEnabled=false"
          frameBorder="0"
          allowFullScreen
          className="dashboard-frame"
        ></iframe>
      </div>
    </div>
  );
}

export default Dashboard;
