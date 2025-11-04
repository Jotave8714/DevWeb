// src/components/StatCard.jsx
import React from "react";

export default function StatCard({ title, value, icon, trend, color }) {
  return (
    <div className="bg-[#1e293b] rounded-lg p-4 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">{title}</p>
        <div className={`p-2 rounded-md ${color}`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-green-400">{trend}</p>
    </div>
  );
}
