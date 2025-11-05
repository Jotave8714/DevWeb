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
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/pacientes/${id}`, paciente);
      alert("Paciente atualizado com sucesso!");
      navigate("/pacientes");
    } catch (err) {
      console.error("Erro ao atualizar paciente:", err);
      alert("Erro ao atualizar paciente");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#0b1120]">
        Carregando paciente...
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-[#0b1120]">
        Paciente não encontrado.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 space-y-8 relative">
          <button
            onClick={() => navigate("/pacientes")}
            className="absolute top-6 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Voltar</span>
          </button>

          <div className="mt-10"></div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <User className="text-green-400" size={20} />
                <h3 className="text-lg font-semibold text-white">
                  Informações Pessoais
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Nome Completo", name: "nome" },
                  { label: "CPF", name: "cpf" },
                  { label: "Data de Nascimento", name: "dataNascimento", type: "date" },
                  { label: "Sexo", name: "sexo", type: "select", options: ["Feminino", "Masculino", "Outro"] },
                  { label: "Telefone", name: "telefone" },
                  { label: "E-mail", name: "email", type: "email" },
                  { label: "Endereço", name: "endereco", colSpan: 2 },
                  { label: "Cidade", name: "cidade" },
                  { label: "Estado", name: "estado" },
                  { label: "CEP", name: "cep" },
                ].map((field, idx) => (
                  <div key={idx} className={field.colSpan ? "md:col-span-2" : ""}>
                    <label className="block text-gray-400 mb-1">{field.label}</label>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={paciente[field.name] || ""}
                        onChange={(e) =>
                          setPaciente({ ...paciente, [field.name]: e.target.value })
                        }
                        className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                      >
                        {field.options.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={paciente[field.name] || ""}
                        onChange={(e) =>
                          setPaciente({ ...paciente, [field.name]: e.target.value })
                        }
                        className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Lateral de status */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                Status das Vacinas
              </h3>
              <p className="text-gray-400 text-sm">
                (Em breve: controle dinâmico de vacinas)
              </p>
            </div>
          </form>

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