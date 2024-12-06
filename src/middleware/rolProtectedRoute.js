import React from 'react';
import { Navigate } from 'react-router-dom';

const RolProtectedRoute = ({ allowedRole, children }) => {
  const currentRole = localStorage.getItem('rol');

  // Si el rol no coincide, redirigir a otra página (por ejemplo, una página de error o login)
  if (currentRole !== allowedRole) {
    return <Navigate to="/app" />;
  }

  // Si el rol es válido, renderizar los hijos
  return <>{children}</>;
};

export default RolProtectedRoute;
