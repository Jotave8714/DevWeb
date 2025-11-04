// src/components/AuthLayout.jsx
import React from "react";

export default function AuthLayout({ leftContent, children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg">
        {/* Lado esquerdo */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-[#22c55e] to-[#16a34a] p-10 flex flex-col justify-center text-white">
          {leftContent}
        </div>

        {/* Lado direito */}
        <div className="w-full md:w-1/2 bg-[#0b0f19] text-gray-100 flex flex-col justify-center p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
