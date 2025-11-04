// src/pages/EsqueciSenha.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function EsqueciSenha() {
  useEffect(() => {
    document.title = "Recuperar Senha - VaxControl";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f19] text-gray-100 p-4">
      <div className="w-full max-w-sm bg-[#111827] rounded-2xl p-8 shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/20 p-4 rounded-full">
            <span className="text-3xl">🛡️</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2 text-white">
          Recuperar Senha
        </h2>
        <p className="text-sm text-gray-400 text-center mb-8">
          Digite seu e-mail para receber as instruções de redefinição.
        </p>

        <form className="space-y-6">
          <div>
            <label className="text-sm block mb-2 text-left">E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full px-4 py-2 bg-[#1c2431] border border-[#334155] rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition font-medium"
          >
            Enviar Instruções
          </button>
        </form>

        <div className="border-t border-gray-700 my-6"></div>

        <div className="text-center">
          <Link
            to="/"
            className="text-green-400 hover:underline text-sm flex items-center justify-center gap-1"
          >
            ← Voltar ao Login
          </Link>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-6">
        Sistema de Gerenciamento de Vacinas
      </p>
    </div>
  );
}
