import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Obtiene el token almacenado

  if (!token) {
    return <Navigate to="/login" />; // Redirige a la página de login si no hay token
  }

  return children; // Renderiza la ruta si el token existe
};

export default ProtectedRoute;
