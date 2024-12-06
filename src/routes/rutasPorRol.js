import VistaProvisional from "../views/vistaProvisional/vistaProvisional";


export const getConditionalRoutes = () => {
    const rol = localStorage.getItem('rol');
    console.log('Condición del rol:', rol);  // Verifica si el rol se está obteniendo correctamente
  
    if (rol === 'Administrativo') {
      return [
        { path: "/app", exact: true, element: <VistaProvisional /> }
      ];
    }
    return [];  // Si no es 'Administrativo', no se retorna ninguna ruta
  };