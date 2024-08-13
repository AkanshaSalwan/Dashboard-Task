import React from "react";
import "./App.css";
import Cloud from '../src/images/cloud.png';
import Google from '../src/images/google.png';

function App() {
  return (
    <div className="container">
      {/* Main CSPM Dashboard Heading */}
      <div className="header-content">
        <h1>CNAPP Dashboard</h1>
      </div>

      {/* Toolbar Section */}
      <div className="toolbar">
    <div className="dropdown">
        <select className="dropdown-select">
            <option>Last 2 days</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
        </select>
    </div>
    <button className="add-widget-button">+ Add Widget</button>
    <div className="options-menu">
        <button className="menu-button">⋮</button>
    </div>
</div>

      {/* CSPM Executive Dashboard Section */}
      <div className="dashboard-section">
        <h2 className="dashboard-heading">CSPM Executive Dashboard</h2>
        <div className="cards-container">
          <div className="card">
            Cloud Accounts
            <img src={Cloud} alt="Cloud" />
          </div>
          <div className="card">
            Cloud Account Risk Assessment
            <img src={Google} alt="Google" />
          </div>
          <div className="card1">+ Add Widget</div>
        </div>
      </div>

      {/* CWPP Dashboard Section */}
      <div className="dashboard-section">
        <h2 className="dashboard-heading">CWPP Dashboard</h2>
        <div className="cards-container">
          <div className="card">Top 5 Namespace Specific Alerts</div>
          <div className="card">Workload Alerts</div>
          <div className="card1">+ Add Widget</div>
        </div>
      </div>

      {/* Registry Scan Section */}
      <div className="dashboard-section">
        <h2 className="dashboard-heading">Registry Scan</h2>
        <div className="cards-container">
          <div className="card">Image Risk Assessment</div>
          <div className="card">Image Security Issues</div>
          <div className="card1">+ Add Widget</div>
        </div>
      </div>
    </div>
  );
}

export default App;
