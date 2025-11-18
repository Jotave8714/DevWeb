import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../api";
import { ArrowLeft, Syringe, Settings } from "lucide-react";

export default function EditarVacina() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    fabricante: "",
    lotePadrao: "",
    validade: "",
    numDoses: "",
    intervalosDias: [],
    publicoAlvo: "",
    status: "",
  });

  const [intervaloInput, setIntervaloInput] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔥 Carregar vacina ao abrir a página
  useEffect(() => {
    const fetchVacina = async () => {
      try {
        const res = await API.get(`/vacinas/${id}`);

        setForm({
          ...res.data,
          intervalosDias: res.data.intervalosDias || [],
        });
      } catch (err) {
        alert("Erro ao carregar vacina.");
      } finally {
        setLoading(false);
      }
    };

    fetchVacina();
  }, [id]);

  // 🔥 Validações finais
  const validate = () => {
    const newErrors = {};

    if (!form.nome.trim()) newErrors.nome = "O nome é obrigatório.";

    if (form.numDoses < 1)
      newErrors.numDoses = "A vacina deve possuir pelo menos 1 dose.";

    if (form.numDoses > 1 && form.intervalosDias.length !== form.numDoses - 1)
      newErrors.intervalosDias =
        "A quantidade de intervalos deve ser igual ao número de doses - 1.";

    // ❗ Bloquear intervalo negativo ou zero
    if (form.intervalosDias.some((n) => n <= 0))
      newErrors.intervalosDias = "Todos os intervalos devem ser números positivos.";

    if (
      form.validade &&
      new Date(form.validade) < new Date(new Date().toISOString().slice(0, 10))
    )
      newErrors.validade = "A validade não pode estar no passado.";

    if (!form.status) newErrors.status = "Selecione um status.";

    return newErrors;
  };

  // 🔥 Atualizar inputs do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Adicionar intervalo entre doses
  const addIntervalo = () => {
    if (!intervaloInput.trim()) return;

    const valor = Number(intervaloInput);

    // ❗ Bloqueio REAL de valores inválidos
    if (isNaN(valor) || valor <= 0) {
      setErrors({
        ...errors,
        intervalosDias: "O intervalo deve ser um número positivo.",
      });
      return;
    }

    setForm({
      ...form,
      intervalosDias: [...form.intervalosDias, valor],
    });

    setIntervaloInput("");
    setErrors({ ...errors, intervalosDias: null });
  };

  // Remover intervalo
  const removeIntervalo = (index) => {
    setForm({
      ...form,
      intervalosDias: form.intervalosDias.filter((_, i) => i !== index),
    });
  };

  // 🔥 Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await API.put(`/vacinas/${id}`, form);
      alert("Vacina atualizada com sucesso!");
      navigate("/vacinas");
    } catch (err) {
      alert("Erro ao atualizar vacina.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#0b1120]">
        Carregando vacina...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 relative space-y-8">
          {/* VOLTAR */}
          <button
            onClick={() => navigate("/vacinas")}
            className="absolute top-6 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Voltar</span>
          </button>

          <div className="mt-10"></div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {/* COLUNA PRINCIPAL */}
            <div className="md:col-span-2 bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Syringe className="text-green-400" size={20} />
                <h3 className="text-lg font-semibold">Editar Vacina</h3>
              </div>

              {/* CAMPOS */}
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {/* Nome */}
                <div>
                  <label className="block text-gray-400 mb-1">Nome</label>
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2"
                  />
                  {errors.nome && (
                    <p className="text-red-500 text-xs">{errors.nome}</p>
                  )}
                </div>

                {/* Fabricante */}
                <div>
                  <label className="block text-gray-400 mb-1">Fabricante</label>
                  <input
                    name="fabricante"
                    value={form.fabricante}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2"
                  />
                </div>

                {/* Lote Padrão */}
                <div>
                  <label className="block text-gray-400 mb-1">Lote</label>
                  <input
                    name="lotePadrao"
                    value={form.lotePadrao}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2"
                  />
                </div>

                {/* Validade */}
                <div>
                  <label className="block text-gray-400 mb-1">Validade</label>
                  <input
                    type="date"
                    name="validade"
                    value={form.validade?.substring(0, 10) || ""}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2"
                  />
                  {errors.validade && (
                    <p className="text-red-500 text-xs">{errors.validade}</p>
                  )}
                </div>

                {/* Número de Doses */}
                <div>
                  <label className="block text-gray-400 mb-1">Número de Doses</label>
                  <input
                    type="number"
                    min="1"
                    name="numDoses"
                    value={form.numDoses}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2"
                  />
                  {errors.numDoses && (
                    <p className="text-red-500 text-xs">{errors.numDoses}</p>
                  )}
                </div>

                {/* Público Alvo */}
                <div>
                  <label className="block text-gray-400 mb-1">Público Alvo</label>
                  <input
                    name="publicoAlvo"
                    value={form.publicoAlvo}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2"
                  />
                </div>
              </div>

              {/* INTERVALOS ENTRE DOSES */}
              {form.numDoses > 1 && (
                <div className="mt-4">
                  <label className="block text-gray-400 mb-2">
                    Intervalos entre Doses
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      value={intervaloInput}
                      onChange={(e) => setIntervaloInput(e.target.value)}
                      placeholder="Dias"
                      className="bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 w-32"
                    />
                    <button
                      type="button"
                      onClick={addIntervalo}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 rounded"
                    >
                      Adicionar
                    </button>
                  </div>

                  {errors.intervalosDias && (
                    <p className="text-red-500 text-xs">{errors.intervalosDias}</p>
                  )}

                  {/* Lista */}
                  <ul className="mt-3 space-y-1">
                    {form.intervalosDias.map((dias, i) => (
                      <li
                        key={i}
                        className="flex justify-between bg-[#1e293b] px-3 py-2 rounded border border-[#334155]"
                      >
                        <span>{dias} dias</span>
                        <button
                          type="button"
                          onClick={() => removeIntervalo(i)}
                          className="text-red-400 hover:text-red-500 text-sm"
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* COLUNA LATERAL */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Settings className="text-green-400" size={20} />
                <h3 className="text-lg font-semibold">Configurações</h3>
              </div>

              <label className="block text-gray-400 text-sm">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2"
              >
                <option value="">Selecione</option>
                <option value="Ativa">Ativa</option>
                <option value="Vencendo">Vencendo</option>
                <option value="Inativa">Inativa</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs">{errors.status}</p>
              )}
            </div>
          </form>

          {/* BOTÕES */}
          <div className="flex justify-end gap-3 max-w-5xl mx-auto">
            <button
              onClick={() => navigate("/vacinas")}
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
