// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowed }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Não está logado → manda pro login
  if (!user) return <Navigate to="/" />;

  // Se a rota exigir tipos específicos:
  if (allowed && !allowed.includes(user.tipo)) {
    return <Navigate to="/dashboard" />; // funcionário tentando acessar rota do admin
  }

  return children;
}
