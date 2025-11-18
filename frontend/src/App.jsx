// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
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

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ------ ROTAS PÚBLICAS ------ */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/cadastro" element={<Cadastro />} /> */}
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />

        {/* ------ ROTAS PARA QUALQUER USUÁRIO LOGADO ------ */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

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

        {/* ------ VACINAS (acesso para ambos) ------ */}
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

        {/* ------ FUNCIONARIOS (somente ADMIN) ------ */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowed={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/funcionarios"
          element={
            <PrivateRoute allowed={["admin"]}>
              <Funcionarios />
            </PrivateRoute>
          }
        />

        {/* ------ ESQUEMAS DE DOSES (ambos acessam, mas admin edita) ------ */}
        <Route
          path="/doses"
          element={
            <PrivateRoute allowed={["admin", "funcionario"]}>
              <EsquemasDoses />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}
