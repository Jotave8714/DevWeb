import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ArrowLeft, User, CheckCircle } from "lucide-react";
import API from "../api";

export default function EditarPaciente() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [paciente, setPaciente] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Carrega dados
  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const res = await API.get(`/pacientes/${id}`);
        setPaciente(res.data);
      } catch (err) {
        console.error("Erro ao carregar paciente:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaciente();
  }, [id]);

  // 🛡 Validação (MESMA DA TELA DE CADASTRO)
  const validate = () => {
    const newErrors = {};

    if (!paciente.nome?.trim()) newErrors.nome = "O nome é obrigatório.";

    const birth = new Date(paciente.dataNascimento);
    const minBirth = new Date("1900-01-01");
    const today = new Date();

    if (!paciente.dataNascimento)
      newErrors.dataNascimento = "A data de nascimento é obrigatória.";
    else if (birth > today)
      newErrors.dataNascimento = "A data não pode ser no futuro.";
    else if (birth < minBirth)
      newErrors.dataNascimento = "Ano mínimo permitido é 1900.";
    else if (today.getFullYear() - birth.getFullYear() > 120)
      newErrors.dataNascimento = "Idade acima do limite permitido.";

    if (!paciente.sexo)
      newErrors.sexo = "Selecione um gênero.";

    if (!/^\d{11}$/.test(paciente.cpf || ""))
      newErrors.cpf = "CPF deve conter 11 números.";

    if (!/^[1-9]{2}[0-9]{8,9}$/.test(paciente.telefone || ""))
      newErrors.telefone = "Telefone inválido. Use DDD + número (apenas números).";

    if (!/\S+@\S+\.\S+/.test(paciente.email || ""))
      newErrors.email = "E-mail inválido.";

    if (!paciente.endereco?.trim())
      newErrors.endereco = "O endereço é obrigatório.";

    if (!paciente.cidade?.trim())
      newErrors.cidade = "A cidade é obrigatória.";

    if (!paciente.estado)
      newErrors.estado = "Selecione um estado.";

    if (!/^\d{8}$/.test(paciente.cep || ""))
      newErrors.cep = "CEP deve conter 8 números.";

    return newErrors;
  };

  // Salvar alterações
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await API.put(`/pacientes/${id}`, paciente);
      alert("Paciente atualizado com sucesso!");
      navigate("/pacientes");
    } catch (err) {
      console.error("Erro ao atualizar paciente:", err);
      alert("Erro ao atualizar paciente");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#0b1120]">
        Carregando paciente...
      </div>
    );

  if (!paciente)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-[#0b1120]">
        Paciente não encontrado.
      </div>
    );

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 space-y-8 relative">

          {/* VOLTAR */}
          <button
            onClick={() => navigate("/pacientes")}
            className="absolute top-6 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Voltar</span>
          </button>

          <div className="mt-10"></div>

          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">

            {/* INFORMACOES PESSOAIS */}
            <div className="md:col-span-2 bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <User className="text-green-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Informações Pessoais</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">

                {/* NOME */}
                <div>
                  <label className="block text-gray-400 mb-1">Nome Completo</label>
                  <input
                    name="nome"
                    value={paciente.nome || ""}
                    onChange={(e) =>
                      setPaciente({ ...paciente, nome: e.target.value })
                    }
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                  {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                </div>

                {/* CPF */}
                <div>
                  <label className="block text-gray-400 mb-1">CPF</label>
                  <input
                    name="cpf"
                    value={paciente.cpf || ""}
                    onChange={(e) =>
                      setPaciente({ ...paciente, cpf: e.target.value })
                    }
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                  {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
                </div>

                {/* DATA NASCIMENTO */}
                <div>
                  <label className="block text-gray-400 mb-1">Data de Nascimento</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={paciente.dataNascimento?.substring(0, 10) || ""}
                    onChange={(e) =>
                      setPaciente({ ...paciente, dataNascimento: e.target.value })
                    }
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                  {errors.dataNascimento && (
                    <p className="text-red-500 text-xs mt-1">{errors.dataNascimento}</p>
                  )}
                </div>

                {/* SEXO */}
                <div>
                  <label className="block text-gray-400 mb-1">Sexo</label>
                  <select
                    name="sexo"
                    value={paciente.sexo || ""}
                    onChange={(e) =>
                      setPaciente({ ...paciente, sexo: e.target.value })
                    }
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Selecione</option>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Outro</option>
                  </select>
                  {errors.sexo && <p className="text-red-500 text-xs mt-1">{errors.sexo}</p>}
                </div>

                {/* TELEFONE */}
                <div>
                  <label className="block text-gray-400 mb-1">Telefone</label>
                  <input
                    name="telefone"
                    value={paciente.telefone || ""}
                    onChange={(e) =>
                      setPaciente({ ...paciente, telefone: e.target.value })
                    }
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                  {errors.telefone && (
                    <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-gray-400 mb-1">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={paciente.email || ""}
                    onChange={(e) =>
                      setPaciente({ ...paciente, email: e.target.value })
                    }
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* ENDEREÇO */}
                <div className="md:col-span-2">
                  <label className="block text-gray-400 mb-1">Endereço</label>
                  <input
                    name="endereco"
                    value={paciente.endereco || ""}
                    onChange={(e) =>
                      setPaciente({ ...paciente, endereco: e.target.value })
                    }
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                  {errors.endereco && (
                    <p className="text-red-500 text-xs mt-1">{errors.endereco}</p>
                  )}
                </div>

                {/* CIDADE */}
                <div>
                  <label className="block text-gray-400 mb-1">Cidade</label>
                  <input
                    name="cidade"
                    value={paciente.cidade || ""}
                    onChange={(e) =>
                      setPaciente({ ...paciente, cidade: e.target.value })
                    }
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                  {errors.cidade && (
                    <p className="text-red-500 text-xs mt-1">{errors.cidade}</p>
                  )}
                </div>

                {/* ESTADO */}
                <div>
                  <label className="block text-gray-400 mb-1">Estado</label>
                  <select
                    name="estado"
                    value={paciente.estado || ""}
                    onChange={(e) =>
                      setPaciente({ ...paciente, estado: e.target.value })
                    }
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
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

                {/* CEP */}
                <div>
                  <label className="block text-gray-400 mb-1">CEP</label>
                  <input
                    name="cep"
                    value={paciente.cep || ""}
                    onChange={(e) =>
                      setPaciente({ ...paciente, cep: e.target.value })
                    }
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                  {errors.cep && (
                    <p className="text-red-500 text-xs mt-1">{errors.cep}</p>
                  )}
                </div>

              </div>
            </div>

            {/* LATERAL (STATUS) */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                Status das Vacinas
              </h3>
              <p className="text-gray-400 text-sm">(Em breve)</p>
            </div>

          </form>

          {/* BOTÕES */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => navigate("/pacientes")}
              type="button"
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            >
              Salvar Alterações
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}
