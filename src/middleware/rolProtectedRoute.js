// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const RolProtectedRoute = ({ allowedRole, children }) => {
//   const currentRole = localStorage.getItem('rol');

//   // Si el rol no coincide, redirigir a otra página (por ejemplo, una página de error o login)
//   if (currentRole !== allowedRole) {
//     return <Navigate to="/app" />;
//   }

//   // Si el rol es válido, renderizar los hijos
//   return <>{children}</>;
// };

// export default RolProtectedRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const RolProtectedRoute = ({ children }) => {
  const rol = localStorage.getItem('rol');  // Obtener el rol desde localStorage

  if (!rol) {
    return <Navigate to="/login" />;  // Si no hay rol, redirigir al login
  }

  return children({ rol });  // Pasar el rol a los hijos como prop
};

export default RolProtectedRoute;



