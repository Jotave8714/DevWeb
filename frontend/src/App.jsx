import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import EsqueciSenha from "./pages/EsqueciSenha";
import Dashboard from "./pages/Dashboard"; // ✅ importante
import Pacientes from "./pages/Pacientes";
import CadastroPaciente from "./pages/CadastroPaciente";
import Vacinas from "./pages/Vacinas";
import PacienteDetalhes from "./pages/PacienteDetalhes";
import EditarPaciente from "./pages/EditarPaciente";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ aqui */}
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientes/novo" element={<CadastroPaciente />} />
        <Route path="/vacinas" element={<Vacinas />} />
        <Route path="/pacientes/detalhes" element={<PacienteDetalhes />} />
        <Route path="/pacientes/editar" element={<EditarPaciente />} />
      </Routes>
    </Router>
  );
}
