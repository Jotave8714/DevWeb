// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import EsqueciSenha from "./pages/EsqueciSenha";

import Dashboard from "./pages/Dashboard";

import Pacientes from "./pages/Pacientes";
import CadastroPaciente from "./pages/CadastroPaciente";
import PacienteDetalhes from "./pages/PacienteDetalhes";
import EditarPaciente from "./pages/EditarPaciente";

import Vacinas from "./pages/Vacinas";
import EditarVacina from "./pages/EditarVacina";

import AdminDashboard from "./pages/AdminDashboard";
import Funcionarios from "./pages/Funcionarios";
import EsquemasDoses from "./pages/EsquemasDoses";

import PrivateRoute from "./components/PrivateRoute";
import Relatorios from "./pages/Relatorios";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ------ ROTAS PÚBLICAS ------ */}
        <Route path="/" element={<Login />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />

        {/* ------ DASHBOARD ------ */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ------ PACIENTES ------ */}
        <Route
          path="/pacientes"
          element={
            <PrivateRoute allowed={["admin", "funcionario"]}>
              <Pacientes />
            </PrivateRoute>
          }
        />

        <Route
          path="/pacientes/novo"
          element={
            <PrivateRoute allowed={["admin"]}>
              <CadastroPaciente />
            </PrivateRoute>
          }
        />

        <Route
          path="/pacientes/detalhes/:id"
          element={
            <PrivateRoute allowed={["admin", "funcionario"]}>
              <PacienteDetalhes />
            </PrivateRoute>
          }
        />

        <Route
          path="/pacientes/editar/:id"
          element={
            <PrivateRoute allowed={["admin"]}>
              <EditarPaciente />
            </PrivateRoute>
          }
        />

        {/* ------ VACINAS ------ */}
        <Route
          path="/vacinas"
          element={
            <PrivateRoute allowed={["admin", "funcionario"]}>
              <Vacinas />
            </PrivateRoute>
          }
        />

        <Route
          path="/vacinas/editar/:id"
          element={
            <PrivateRoute allowed={["admin", "funcionario"]}>
              <EditarVacina />
            </PrivateRoute>
          }
        />

        {/* ------ FUNCIONARIOS ------ */}
        <Route
          path="/funcionarios"
          element={
            <PrivateRoute allowed={["admin"]}>
              <Funcionarios />
            </PrivateRoute>
          }
        />

        {/* ------ ADMIN ------ */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowed={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* ------ ESQUEMA DE DOSES ------ */}
        <Route
          path="/doses"
          element={
            <PrivateRoute allowed={["admin", "funcionario"]}>
              <EsquemasDoses />
            </PrivateRoute>
          }
        />

        {/* ------ RELATORIOS ------ */}
        <Route
          path="/relatorios"
          element={
            <PrivateRoute allowed={["admin", "funcionario"]}>
              <Relatorios />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}
