import React from "react";
import "./App.css";
import { WelcomePage } from "./pages/WelcomePage";
import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
