import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ArrowLeft, UserPlus, Phone, MapPin, Stethoscope } from "lucide-react";
import API from "../api"; // 👈 conexão centralizada com o backend

export default function CadastroPaciente() {
  const navigate = useNavigate();

  // Estados para cada campo do formulário
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    genero: "",
    cpf: "",
    telefone: "",
    email: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    observacoes: "",
  });

  // Atualiza dinamicamente os campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Envia os dados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/pacientes", formData);
      alert("✅ Paciente cadastrado com sucesso!");
      console.log("Novo paciente:", response.data);
      navigate("/pacientes");
    } catch (err) {
      console.error("Erro ao cadastrar paciente:", err);
      alert("❌ Erro ao cadastrar paciente. Verifique o console.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 space-y-8 relative">
          {/* Botão Voltar */}
          <button
            onClick={() => navigate("/pacientes")}
            className="absolute top-6 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Voltar</span>
          </button>

          <div className="mt-10 bg-[#111827] border border-[#1f2937] rounded-xl p-10 max-w-5xl mx-auto shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-2">
              Cadastro de Paciente
            </h2>
            <p className="text-sm text-gray-400 mb-10">
              Preencha as informações do novo paciente com atenção.
            </p>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Informações Pessoais */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <UserPlus className="text-green-400" size={18} />
                  <h3 className="text-green-400 font-semibold text-lg">
                    Informações Pessoais
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    name="nome"
                    type="text"
                    placeholder="Nome Completo *"
                    className="input"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="dataNascimento"
                    type="date"
                    className="input"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    required
                  />
                  <select
                    name="genero"
                    className="input"
                    value={formData.genero}
                    onChange={handleChange}
                  >
                    <option value="">Selecione o Gênero</option>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Outro</option>
                  </select>
                  <input
                    name="cpf"
                    type="text"
                    placeholder="CPF"
                    className="input"
                    value={formData.cpf}
                    onChange={handleChange}
                  />
                </div>
              </section>

              {/* Contato */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="text-green-400" size={18} />
                  <h3 className="text-green-400 font-semibold text-lg">
                    Contato
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    name="telefone"
                    type="text"
                    placeholder="Telefone *"
                    className="input"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    className="input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </section>

              {/* Endereço */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-green-400" size={18} />
                  <h3 className="text-green-400 font-semibold text-lg">
                    Endereço
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <input
                    name="cep"
                    type="text"
                    placeholder="CEP"
                    className="input"
                    value={formData.cep}
                    onChange={handleChange}
                  />
                  <input
                    name="endereco"
                    type="text"
                    placeholder="Endereço (Rua, Avenida, etc.)"
                    className="input md:col-span-2"
                    value={formData.endereco}
                    onChange={handleChange}
                  />
                  <input
                    name="cidade"
                    type="text"
                    placeholder="Cidade"
                    className="input"
                    value={formData.cidade}
                    onChange={handleChange}
                  />
                  <input
                    name="estado"
                    type="text"
                    placeholder="Estado"
                    className="input"
                    value={formData.estado}
                    onChange={handleChange}
                  />
                </div>
              </section>

              {/* Informações Médicas */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="text-green-400" size={18} />
                  <h3 className="text-green-400 font-semibold text-lg">
                    Observações Médicas
                  </h3>
                </div>

                <textarea
                  name="observacoes"
                  placeholder="Alergias, medicamentos em uso, observações gerais..."
                  className="input h-28 resize-none"
                  value={formData.observacoes}
                  onChange={handleChange}
                />
              </section>

              {/* Botões */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => navigate("/pacientes")}
                  className="px-6 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center gap-2 transition"
                >
                  <UserPlus size={18} />
                  Salvar Paciente
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
