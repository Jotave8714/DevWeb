import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ArrowLeft, UserPlus, Phone, MapPin, Stethoscope } from "lucide-react";
import API from "../api";

export default function CadastroPaciente() {
  const navigate = useNavigate();

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

  const [errors, setErrors] = useState({});

  // Atualiza campos SEM mexer no input (evita bug do foco)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Se o campo estava com erro, remove quando começa a digitar
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // 🔎 Função de validação completa
  const validate = () => {
    const newErrors = {};

    // Nome
    if (!formData.nome.trim())
      newErrors.nome = "O nome é obrigatório.";

    // Data de nascimento
    const birth = new Date(formData.dataNascimento);
    const minBirth = new Date("1900-01-01");
    const today = new Date();

    if (!formData.dataNascimento)
      newErrors.dataNascimento = "Data de nascimento é obrigatória.";
    else if (birth > today)
      newErrors.dataNascimento = "A data não pode ser no futuro.";
    else if (birth < minBirth)
      newErrors.dataNascimento = "Ano mínimo permitido é 1900.";
    else if (today.getFullYear() - birth.getFullYear() > 120)
      newErrors.dataNascimento = "Idade acima do limite permitido.";

    // Gênero
    if (!formData.genero)
      newErrors.genero = "Selecione um gênero.";

    // CPF
    if (!/^\d{11}$/.test(formData.cpf))
      newErrors.cpf = "CPF deve conter 11 números.";

    // Telefone — somente números, DDD + número
    if (!/^[1-9]{2}[0-9]{8,9}$/.test(formData.telefone))
      newErrors.telefone =
        "Formato inválido. Use apenas números (DDD + telefone).";

    // Email
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "E-mail inválido.";

    // Endereço
    if (!formData.endereco.trim())
      newErrors.endereco = "O endereço é obrigatório.";

    if (!formData.cidade.trim())
      newErrors.cidade = "A cidade é obrigatória.";

    // Estado — agora é dropdown
    if (!formData.estado)
      newErrors.estado = "Selecione um estado.";

    // CEP
    if (!/^\d{8}$/.test(formData.cep))
      newErrors.cep = "CEP deve conter 8 números.";

    return newErrors;
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // impede envio
    }

    try {
      await API.post("/pacientes", formData);
      alert("✅ Paciente cadastrado com sucesso!");
      navigate("/pacientes");
    } catch (err) {
      console.error("Erro ao cadastrar paciente:", err);
      alert("❌ Erro ao cadastrar paciente.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />

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
            <h2 className="text-2xl font-bold text-white mb-2">Cadastro de Paciente</h2>
            <p className="text-sm text-gray-400 mb-10">
              Preencha as informações do novo paciente com atenção.
            </p>

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* ======================== */}
              {/* INFORMACOES PESSOAIS     */}
              {/* ======================== */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <UserPlus className="text-green-400" size={18} />
                  <h3 className="text-green-400 font-semibold text-lg">Informações Pessoais</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Nome */}
                  <div>
                    <input
                      name="nome"
                      type="text"
                      placeholder="Nome Completo *"
                      className="input"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                    {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                  </div>

                  {/* Data Nascimento */}
                  <div>
                    <input
                      name="dataNascimento"
                      type="date"
                      className="input"
                      value={formData.dataNascimento}
                      onChange={handleChange}
                    />
                    {errors.dataNascimento && (
                      <p className="text-red-500 text-xs mt-1">{errors.dataNascimento}</p>
                    )}
                  </div>

                  {/* Gênero */}
                  <div>
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
                    {errors.genero && (
                      <p className="text-red-500 text-xs mt-1">{errors.genero}</p>
                    )}
                  </div>

                  {/* CPF */}
                  <div>
                    <input
                      name="cpf"
                      type="text"
                      placeholder="CPF"
                      className="input"
                      value={formData.cpf}
                      onChange={handleChange}
                    />
                    {errors.cpf && (
                      <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>
                    )}
                  </div>

                </div>
              </section>

              {/* ======================== */}
              {/* CONTATO                  */}
              {/* ======================== */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="text-green-400" size={18} />
                  <h3 className="text-green-400 font-semibold text-lg">Contato</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Telefone */}
                  <div>
                    <input
                      name="telefone"
                      type="text"
                      placeholder="Telefone * (DDD + número)"
                      className="input"
                      value={formData.telefone}
                      onChange={handleChange}
                    />
                    {errors.telefone && (
                      <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      className="input"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                </div>
              </section>

              {/* ======================== */}
              {/* ENDEREÇO                */}
              {/* ======================== */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-green-400" size={18} />
                  <h3 className="text-green-400 font-semibold text-lg">Endereço</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                  {/* CEP */}
                  <div>
                    <input
                      name="cep"
                      type="text"
                      placeholder="CEP"
                      className="input"
                      value={formData.cep}
                      onChange={handleChange}
                    />
                    {errors.cep && (
                      <p className="text-red-500 text-xs mt-1">{errors.cep}</p>
                    )}
                  </div>

                  {/* Endereço */}
                  <div className="md:col-span-2">
                    <input
                      name="endereco"
                      type="text"
                      placeholder="Endereço (Rua, Avenida, etc.)"
                      className="input"
                      value={formData.endereco}
                      onChange={handleChange}
                    />
                    {errors.endereco && (
                      <p className="text-red-500 text-xs mt-1">{errors.endereco}</p>
                    )}
                  </div>

                  {/* Cidade */}
                  <div>
                    <input
                      name="cidade"
                      type="text"
                      placeholder="Cidade"
                      className="input"
                      value={formData.cidade}
                      onChange={handleChange}
                    />
                    {errors.cidade && (
                      <p className="text-red-500 text-xs mt-1">{errors.cidade}</p>
                    )}
                  </div>

                  {/* Estado — dropdown */}
                  <div>
                    <select
                      name="estado"
                      className="input"
                      value={formData.estado}
                      onChange={handleChange}
                    >
                      <option value="">Selecione o Estado</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>

                    {errors.estado && (
                      <p className="text-red-500 text-xs mt-1">{errors.estado}</p>
                    )}
                  </div>

                </div>
              </section>

              {/* Informações Médicas */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="text-green-400" size={18} />
                  <h3 className="text-green-400 font-semibold text-lg">Observações Médicas</h3>
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
