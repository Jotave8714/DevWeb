// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import EsqueciSenha from "./pages/EsqueciSenha";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import CadastroPaciente from "./pages/CadastroPaciente";
import Vacinas from "./pages/Vacinas";
import PacienteDetalhes from "./pages/PacienteDetalhes";
import EditarPaciente from "./pages/EditarPaciente";
import AdminDashboard from "./pages/AdminDashboard";
import Funcionarios from "./pages/Funcionarios";
import EditarVacina from "./pages/EditarVacina"; // <-- adicione esta linha

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientes/novo" element={<CadastroPaciente />} />
        <Route path="/pacientes/detalhes/:id" element={<PacienteDetalhes />} /> {/* ✅ dinâmica */}
        <Route path="/pacientes/editar/:id" element={<EditarPaciente />} /> {/* ✅ dinâmica */}
        <Route path="/vacinas" element={<Vacinas />} />
        <Route path="/vacinas/editar/:id" element={<EditarVacina />} /> {/* <-- nova rota */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/funcionarios" element={<Funcionarios />} /> {/* <-- nova rota */}
      </Routes>
    </Router>
  );
}