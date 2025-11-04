// src/components/LogoCard.jsx
import React from "react";

export default function LogoCard() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-11 h-11 bg-green-500 rounded-lg flex items-center justify-center">
        <span className="text-white text-lg font-bold">💉</span>
      </div>
      <div>
        <h1 className="font-bold text-2xl text-white leading-tight">
          VaxControl
        </h1>
        <p className="text-sm text-gray-400 leading-tight">
          Sistema de Gerenciamento
        </p>
      </div>
    </div>
  );
}
